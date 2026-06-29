// seeders/userSeeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connectDB } = require("../config/db");
const { faker } = require("@faker-js/faker");
const User = require("../models/users");

const userFactory = async (role = "member") => ({
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password: await bcrypt.hash("password123", 10), // default password untuk testing
  role,
  deletedAt: null,
});

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    console.log("🗑️  Data user lama dihapus");

    // Buat 1 admin tetap (untuk testing login)
    const admin = new User({
      name: "Admin Utama",
      email: "admin@library.com",
      password: "admin123",
      role: "admin",
    });
    await admin.save(); // gunakan .save() agar pre("save") hash password berjalan

    // Buat 10 member dummy
    const memberPromises = Array.from({ length: 10 }, () =>
      userFactory("member"),
    );
    const members = await Promise.all(memberPromises);
    await User.insertMany(members); // sudah di-hash manual di factory

    console.log("🌱 1 admin + 10 member dummy berhasil dibuat!");
    console.log("📧 Admin login: admin@library.com / admin123");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
