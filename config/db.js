require("dotenv").config();
const mongoose = require("mongoose");

// Koneksi ke database
const connectDB = async () => {
  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState >= 1) {
    console.log("DB sudah terhubung, skip koneksi ulang");
    return;
  }

  try {
    const db = process.env.MONGODB_URL;
    const connection = await mongoose.connect(db);

    console.log("DB berhasil terhubung: ", connection.connection.host);
  } catch (error) {
    console.error("Gagal terhubung ke database:", error);
    process.exit(-1);
  }
};

module.exports = { connectDB };
