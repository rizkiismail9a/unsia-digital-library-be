const Joi = require("joi");

// Helper regex untuk memvalidasi ObjectId MongoDB (24 karakter heksadesimal)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

/**
 * Schema validasi transaksi Peminjaman (Loan)
 */
const createLoanSchema = Joi.object({
  bookId: Joi.string().regex(objectIdPattern).required().messages({
    "string.pattern.base": "ID Buku harus berupa Mongo ObjectId yang valid",
    "string.empty": "Buku wajib dipilih",
    "any.required": "Buku yang dipinjam wajib dipilih",
  }),
  memberId: Joi.string().regex(objectIdPattern).required().messages({
    "string.pattern.base": "ID Anggota harus berupa Mongo ObjectId yang valid",
    "string.empty": "Anggota wajib dipilih",
    "any.required": "Anggota perpustakaan wajib dipilih",
  }),
  notes: Joi.string().trim().max(250).allow("", null).messages({
    "string.max": "Catatan maksimal 250 karakter",
  }),
});

module.exports = { createLoanSchema };
