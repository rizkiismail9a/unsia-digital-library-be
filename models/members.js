const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    nim: {
      type: String,
      required: [true, "NIM/NPM wajib diisi"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Nama anggota wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email anggota wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Nomor telepon wajib diisi"],
      trim: true,
    },
    prodi: {
      type: String,
      required: [true, "Program studi wajib diisi"],
      default: "Informatika",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Member", memberSchema);
