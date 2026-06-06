const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addNewBook,
  editOneBook,
  deleteBook,
} = require("../../../controllers/books-controllers");
const { validateBook } = require("../../../middleware/book");
const {
  createBookSchema,
  updateBookSchema,
} = require("../../../validators/bookValidator");

router.get("/all-books", getAllBooks);
router.post("/add-book", validateBook(createBookSchema), addNewBook);
router.put("/update-book/:id", validateBook(updateBookSchema), editOneBook);
router.delete("/delete-book/:id", deleteBook);

module.exports = router;
