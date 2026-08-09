const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const { corsOptions } = require("./config/cors");

const port = 8000;
const app = express();

app.use(cors(corsOptions));
app.use(helmet()); // Aktifkan semua header keamanan browser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("API berjalan dengan baik");
});

app.get("/api/health", async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "API berjalan dengan baik",
    });
  } catch (error) {
    next(error);
  }
});

const booksRoutes = require("./routes/api/books/books");
const authRoutes = require("./routes/api/auth/auth");
const userRoutes = require("./routes/api/users/users");
const memberRoutes = require("./routes/api/member/member");
const loanRoutes = require("./routes/api/loan/loan");
const dashboardRoutes = require("./routes/api/statistics/statistics");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/books", booksRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/statistics", dashboardRoutes);

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
