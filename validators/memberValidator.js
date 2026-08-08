const Joi = require("joi");

// Helper regex untuk memvalidasi ObjectId MongoDB (24 karakter heksadesimal)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

/**
 * Schema validasi saat membuat Anggota baru (Member)
 */
const createMemberSchema = Joi.object({
  nim: Joi.string().trim().min(5).max(20).required().messages({
    "string.empty": "NIM/NPM tidak boleh kosong",
    "string.min": "NIM/NPM minimal 5 karakter",
    "string.max": "NIM/NPM maksimal 20 karakter",
    "any.required": "NIM/NPM wajib diisi",
  }),
  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .pattern(/^[0-9+\-\s]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Nomor telepon hanya boleh berisi angka, spasi, tanda + atau -",
      "string.empty": "Nomor telepon tidak boleh kosong",
      "any.required": "Nomor telepon wajib diisi",
    }),
  prodi: Joi.string().trim().default("Informatika"),
  status: Joi.string()
    .valid("Active", "Inactive", "Suspended")
    .default("Active")
    .messages({
      "any.only":
        "Status harus salah satu dari: Active, Inactive, atau Suspended",
    }),
});

module.exports = { createMemberSchema };
