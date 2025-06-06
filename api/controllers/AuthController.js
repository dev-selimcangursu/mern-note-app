const CompanyModel = require("../models/Company");
const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
let verificationCodes = {};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const addAccount = async (req, res) => {
  const { email, companyName, fullName, password, code } = req.body;

  if (!code) {
    const verificationCode = generateVerificationCode();
    verificationCodes[email] = verificationCode;

    const message = `
Sayın Kullanıcımız,

Demo hesap talebiniz başarıyla alınmıştır.

Hesabınızı oluşturabilmemiz için aşağıdaki doğrulama kodunu kullanarak işleminizi tamamlayabilirsiniz:

Doğrulama Kodunuz: ${verificationCode}

Bu kod 10 dakika boyunca geçerlidir. Güvenliğiniz için kimseyle paylaşmayınız.

İyi günler dileriz.  
Destek Ekibi
`;

    await sendEmail(email, "Demo Hesap Talebi", message);
    return res.status(200).json({ status: "code_sent" });
  }

  if (verificationCodes[email] !== code) {
    return res
      .status(400)
      .json({ status: "invalid_code", message: "Doğrulama kodu geçersiz." });
  }

  try {
    const company = await new CompanyModel({
      uuid: uuidv4(),
      name: companyName,
      email: email,
    }).save();

    await new UserModel({
      uuid: uuidv4(),
      company_id: company._id,
      name: fullName,
      email: email,
      password: await bcrypt.hash(password, 10),
    }).save();

    delete verificationCodes[email];

    return res
      .status(201)
      .json({ status: "success", message: "Hesap başarıyla oluşturuldu." });
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return res.status(500).json({
      status: "error",
      message: "Sunucu hatası. Lütfen tekrar deneyin.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, code } = req.body;

    if (!code) {
      const verificationCode = generateVerificationCode();
      verificationCodes[email] = verificationCode;

      const message = `
Sayın Kullanıcımız,

Sistemimize giriş yapmak için gerekli olan doğrulama kodunuz aşağıda yer almaktadır:

🔐 Giriş Doğrulama Kodunuz: ${verificationCode}

Bu kod, yalnızca 10 dakika boyunca geçerlidir ve güvenliğiniz açısından üçüncü kişilerle paylaşmamanız önemle tavsiye edilir.

Eğer bu talebi siz gerçekleştirmediyseniz, lütfen bizimle derhal iletişime geçiniz.

Sağlıklı günler dileriz.  
Destek Ekibi
`;

      await sendEmail(email, "Hesaba Giriş Doğrulaması", message);
      return res.status(200).json({ status: "code_sent" });
    }

    if (verificationCodes[email] !== code) {
      return res
        .status(400)
        .json({ success: false, message: "Doğrulama kodu geçersiz." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Şifre hatalı." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete verificationCodes[email];

    return res.status(200).json({
      success: true,
      message: "Giriş başarılı.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Giriş hatası:", error);
    return res.status(500).json({ success: false, message: "Sunucu hatası." });
  }
};

module.exports = { addAccount, login };
