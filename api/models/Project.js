const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Proje Adı
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    }, // Hangi Kullanıcı Projeyi Oluşturduysa O Kullanıcının Bağlı Olduğu Firma
    slug: { type: String, required: true, unique: true }, // Proje Slug
    description: { type: String, required: true }, // Proje Açıklaması
    status: { type: Boolean, default: true }, // Projenin Durumu Aktif veya Pasif
    start_date: { type: Date, default: Date.now }, // Proje Başlangıç Tarihi
    end_date: { type: Date, default: Date.now }, // Projenin Tahmini Bitiş Tarihi
    created_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Projeyi Oluşturan Kullanıcı
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    }, // Proje Önceliği
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
