// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    isbn: { type: String, unique: true },
    stock: { type: Number, default: 0 },
    published: { type: Date },
    deletedAt: { type: Date, default: null }, // untuk fitur soft delete
  },
  {
    timestamps: true,
    virtuals: {
      id: {
        get() {
          return this._id;
        },
      },
    },
  },
);

module.exports = mongoose.model("Book", bookSchema);
