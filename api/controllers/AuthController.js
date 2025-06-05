const CompanyModel = require("../models/Company");
const UserModel = require("../models/User");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

let verificationCodes = {};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const addAccount = async (req, res) => {
  const { email, companyName, fullName, password, code } = req.body;

  if (!code) {
    // 1. ADIM: Mail gönder
    const verificationCode = generateVerificationCode();
    verificationCodes[email] = verificationCode;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dev.gursuselimcan@gmail.com",
        pass: "lfiv ldnb myyx wcfc",
      },
    });

    await transporter.sendMail({
      from: '"Doğrulama Kodu" <dev.gursuselimcan@gmail.com>',
      to: email,
      subject: "Demo Hesap Talebi",
      text: `
Sayın Kullanıcımız,

Demo hesap talebiniz başarıyla alınmıştır.

Hesabınızı oluşturabilmemiz için aşağıdaki doğrulama kodunu kullanarak işleminizi tamamlayabilirsiniz:

Doğrulama Kodunuz: ${verificationCode}

Bu kod 10 dakika boyunca geçerlidir. Güvenliğiniz için kimseyle paylaşmayınız.

İyi günler dileriz.  
Destek Ekibi  
`,
    });

    return res.status(200).json({ status: "code_sent" });
  }

  // 2. ADIM: Kod eşleşmesini kontrol et
  if (verificationCodes[email] !== code) {
    return res
      .status(400)
      .json({ status: "invalid_code", message: "Doğrulama kodu geçersiz." });
  }

  try {
    // 3. ADIM: Kayıt işlemleri
    const company = await new CompanyModel({
      uuid: uuidv4(),
      name: companyName,
      email: email
    }).save();

    await new UserModel({
      uuid: uuidv4(),
      company_id: company._id,
      name: fullName,
      email: email,
      password: password
    }).save();

    delete verificationCodes[email];

    return res
      .status(201)
      .json({ status: "success", message: "Hesap başarıyla oluşturuldu." });

  } catch (error) {
    console.error("Kayıt hatası:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Sunucu hatası. Lütfen tekrar deneyin." });
  }
};

module.exports = { addAccount };
