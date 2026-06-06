const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");

const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("API berjalan dengan baik");
});

const booksRoutes = require("./routes/api/books/books");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/books", booksRoutes);

// Middleware 404 — letakkan setelah semua route
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} tidak ditemukan`);
  error.status = 404;
  next(error); // lempar ke error handler
});

app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Aplikasi berjalan di port ${port}`);
  });
});
