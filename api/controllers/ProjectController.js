const Project = require("../models/Project");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const storeProject = async (req, res) => {
  try {
    // Authorization başlığından gelen token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token eksik veya geçersiz" });
    }

    let decoded;
    try {
      // Token doğrulaması yap
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token geçersiz" });
    }
    // Token'dan gelen userId ile kullanıcıyı bul
    const user = await User.findById(decoded.userId);
    if (!user || !user.company_id) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    // İstekten gelen proje bilgileri
    const { name, slug, description, start_date, end_date, priority } =
      req.body;

    // Yeni proje nesnesi
    const newProject = new Project({
      name,
      slug,
      description,
      status: true,
      start_date,
      end_date,
      priority,
      company_id: user.company_id,
      created_by_user_id: user._id,
    });
    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: "Proje başarıyla eklendi",
      project: savedProject,
    });
  } catch (error) {
    console.error("Proje ekleme hatası:", error);
    console.error("Hata detayları:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Proje eklenirken bir hata oluştu",
      error: error.message,
    });
  }
};

module.exports = { storeProject };
