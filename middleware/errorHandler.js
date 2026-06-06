// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  // ID MongoDB tidak valid
  if (err.name === "CastError") {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  // Duplicate key (misal ISBN sudah ada)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} sudah digunakan` });
  }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Terjadi kesalahan server" });
};

module.exports = errorHandler;
