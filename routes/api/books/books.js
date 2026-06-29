const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addNewBook,
  editOneBook,
  deleteBook,
} = require("../../../controllers/books-controllers");
const {
  createBookSchema,
  updateBookSchema,
} = require("../../../validators/bookValidator");
const { requestValidator } = require("../../../middleware/validate");

router.get("/all-books", getAllBooks);
router.post("/add-book", requestValidator(createBookSchema), addNewBook);
router.put("/update-book/:id", requestValidator(updateBookSchema), editOneBook);
router.delete("/delete-book/:id", deleteBook);

module.exports = router;
