const CompanyModel = require("../models/Company");
const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const CODE_EXPIRATION_TIME = 10 * 60 * 1000; // 10 dakika ms olarak

let verificationCodes = {}; // Email'e özel doğrulama kodlarını ve sürelerinin tutulması

// 6 haneli rastgele doğrulama kodu üretir
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Doğrulama kodunu email ile gönder
const sendVerificationEmail = async (email, code, subject, messageBody) => {
  const message = `
Sayın Kullanıcımız,

${messageBody}

Doğrulama Kodunuz: ${code}

Bu kod 10 dakika boyunca geçerlidir. Güvenliğiniz için kimseyle paylaşmayınız.

İyi günler dileriz.  
Destek Ekibi
`;

  await sendEmail(email, subject, message); // Email gönderme işlemi
};

// Hesap oluşturma endpoint'i
const addAccount = async (req, res) => {
  const { email, companyName, fullName, password, code } = req.body;

  // Eğer kod yoksa, doğrulama kodu üret ve gönder
  if (!code) {
    const verificationCode = generateVerificationCode();
    verificationCodes[email] = {
      code: verificationCode,
      expiresAt: Date.now() + CODE_EXPIRATION_TIME,
    };

    await sendVerificationEmail(
      email,
      verificationCode,
      "Demo Hesap Talebi",
      "Demo hesap talebiniz başarıyla alınmıştır.\n\nHesabınızı oluşturabilmemiz için aşağıdaki doğrulama kodunu kullanarak işleminizi tamamlayabilirsiniz:"
    );

    return res.status(200).json({ status: "code_sent" });
  }

  // Kod girilmişse, doğruluğunu ve süresini kontrol et
  const savedCodeObj = verificationCodes[email];
  if (
    !savedCodeObj ||
    savedCodeObj.code !== code ||
    savedCodeObj.expiresAt < Date.now() // Geçerlilik süresi
  ) {
    return res.status(400).json({
      status: "invalid_code",
      message: "Doğrulama kodu geçersiz veya süresi dolmuş.",
    });
  }

  try {
    // Aynı email ile kullanıcı daha önce kayıt olmuşsa hata döner
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Bu email zaten kayıtlı." });
    }
    // Yeni şirket oluştur
    const company = await new CompanyModel({
      uuid: uuidv4(),
      name: companyName,
      email: email,
    }).save();
    // Yeni kullanıcı oluştur

    await new UserModel({
      uuid: uuidv4(),
      company_id: company._id,
      name: fullName,
      email: email,
      password: await bcrypt.hash(password, 10),
    }).save();

    delete verificationCodes[email]; // kayıt işlemleri sonrası üretilen kodu sil

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

// Kullanıcı giriş işlemi
const login = async (req, res) => {
  try {
    const { email, password, code } = req.body;
    // Eğer kod gönderilmemişse, yeni doğrulama kodu gönder
    if (!code) {
      const verificationCode = generateVerificationCode();
      verificationCodes[email] = {
        code: verificationCode,
        expiresAt: Date.now() + CODE_EXPIRATION_TIME,
      };

      await sendVerificationEmail(
        email,
        verificationCode,
        "Hesaba Giriş Doğrulaması",
        "Sistemimize giriş yapmak için gerekli olan doğrulama kodunuz aşağıda yer almaktadır:"
      );

      return res.status(200).json({ status: "code_sent" });
    }

    // Kod doğrulaması
    const savedCodeObj = verificationCodes[email];
    if (
      !savedCodeObj ||
      savedCodeObj.code !== code ||
      savedCodeObj.expiresAt < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        status: "invalid_code",
        message: "Doğrulama kodu geçersiz veya süresi dolmuş.",
      });
    }
    // Kullanıcı var mı kontrolü
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı." });
    }
    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Şifre hatalı." });
    }
    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete verificationCodes[email]; // Oluşturulan Kod silinir

    // Giriş başarılı, token ve kullanıcı bilgisi dönülür
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
