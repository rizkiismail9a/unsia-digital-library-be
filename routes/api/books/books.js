const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  addNewBook,
  editOneBook,
  deleteBook,
  getBookById,
} = require("../../../controllers/books-controllers");
const {
  createBookSchema,
  updateBookSchema,
} = require("../../../validators/bookValidator");
const { requestValidator } = require("../../../middleware/validate");
const authMiddleware = require("../../../middleware/auth");

router.get("/all-books", getAllBooks);
router.get("/:id", getBookById);
router.post(
  "/add-book",
  authMiddleware,
  requestValidator(createBookSchema),
  addNewBook,
);
router.put(
  "/update-book/:id",
  authMiddleware,
  requestValidator(updateBookSchema),
  editOneBook,
);
router.delete("/delete-book/:id", authMiddleware, deleteBook);

module.exports = router;
