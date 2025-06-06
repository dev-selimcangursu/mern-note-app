const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
    uuid: { type: String, required: true }, // Uniq Kod
    name: { type: String, required: true }, // Firma Adı
    email: { type: String, required: true }, // Firma Email
    phone: { type: String }, // Firma Telefonu 
    address: { type: String }, // Firma Adresi
    tax_number: { type: String }, // Firma Vergi Numarası
    tax_office: { type: String }, // Firma Vergi Dairesi
    website: { type: String }, // firma Sitesi
    status: { type: Boolean, default: true } // Firmanın Paneldeki Durumu
}, { timestamps: true });

const Company = mongoose.model('Company', companiesSchema);

module.exports = Company;
