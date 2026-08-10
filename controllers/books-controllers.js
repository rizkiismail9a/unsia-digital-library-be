const books = require("../models/books");

const getAllBooks = async (req, res, next) => {
  try {
    const { includesDeleted } = req.query;

    const filter = includesDeleted === "true" ? {} : { deletedAt: null };

    const data = await books.find(filter);

    if (data) {
      return res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Tambah satu buku
 */
const addNewBook = async (req, res, next) => {
  try {
    if (req.user) {
      const isAdmin = req.user.role === "admin";

      if (isAdmin) {
        const book = await books.create(req.body);
        return res
          .status(201)
          .json({ message: "Buku berhasil ditambahkan", data: book });
      } else {
        return res.status(401).json({
          success: false,
          message: "Akses hanya untuk admin",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Edit satu buku
 */
const editOneBook = async (req, res, next) => {
  try {
    if (req.user) {
      const isAdmin = req.user.role === "admin";

      if (isAdmin) {
        const book = await books.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          {
            new: true, // kembalikan data setelah diupdate
            runValidators: true, // jalankan validasi Mongoose schema
          },
        );

        if (!book) {
          return res.status(404).json({ message: "Buku tidak ditemukan" });
        }

        return res.json({ message: "Buku berhasil diupdate", data: book });
      } else {
        return res.status(401).json({
          success: false,
          message: "Akses hanya untuk admin",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Soft delete satu buku
 */
const deleteBook = async (req, res, next) => {
  try {
    if (req.user) {
      const isAdmin = req.user.role === "admin";

      if (isAdmin) {
        const data = await books.findByIdAndUpdate(
          req.params.id,
          { deletedAt: new Date() },
          {
            new: true,
          },
        );

        if (!data) {
          return res
            .status(404)
            .json({ success: false, message: "Buku tidak ditemukan" });
        }

        return res
          .status(200)
          .json({ success: true, message: "Buku berhasil dihapus" });
      } else {
        return res.status(401).json({
          success: false,
          message: "Akses hanya untuk admin",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Ambil satu buku
 */
const getBookById = async (req, res, next) => {
  try {
    const book = await books.findById(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Buku tidak ditemukan" });
    }

    return res.status(200).json({ success: true, data: book });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  editOneBook,
  deleteBook,
  getBookById,
};
