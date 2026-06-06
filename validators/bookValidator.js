// validators/bookValidator.js
const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  author: Joi.string().min(2).max(100).required(),
  genre: Joi.string().valid(
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Technology",
    "Biography",
  ),
  isbn: Joi.string()
    .length(13)
    .pattern(/^[0-9]+$/)
    .required(),
  stock: Joi.number().integer().min(0).default(0),
  published: Joi.date().max("now"),
});

// Schema update buku — semua jadi opsional
const updateBookSchema = createBookSchema.fork(
  ["title", "author", "isbn"],
  (field) => field.optional(),
);

module.exports = { createBookSchema, updateBookSchema };
