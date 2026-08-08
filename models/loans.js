const mongoose = require("mongoose");

/**
 * FILE LOCATION: /models/Loan.js (atau /src/models/Loan.js)
 * -----------------------------------------------------------
 * Model ini mengelola transaksi peminjaman buku yang menghubungkan Book dan Member.
 */

const loanSchema = new mongoose.Schema(
  {
    loanCode: {
      type: String,
      unique: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Buku yang dipinjam wajib dipilih"],
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: [true, "Anggota perpustakaan wajib dipilih"],
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 hari dari saat dipinjam
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Borrowed", "Returned", "Overdue"],
      default: "Borrowed",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Auto generate kode peminjaman sederhana sebelum disimpan
loanSchema.pre("save", function () {
  if (!this.loanCode) {
    this.loanCode =
      "TRX-" +
      Date.now().toString().slice(-6) +
      Math.floor(100 + Math.random() * 900);
  }
});

module.exports = mongoose.model("Loan", loanSchema);
