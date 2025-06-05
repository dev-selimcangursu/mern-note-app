const mongoose = require('mongoose');

const companiesSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    tax_number: { type: String },
    tax_office: { type: String },
    website: { type: String },
    status: { type: Boolean, default: true }
}, { timestamps: true });

const Company = mongoose.model('Company', companiesSchema);

module.exports = Company;
