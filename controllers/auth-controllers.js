const User = require("../models/users");

const register = async (req, res, next) => {
  try {
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email sudah digunakan" });
    }

    // Buat user baru — password di-hash otomatis oleh pre("save")
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    await user.save(); // dengan menggunakan method .save(), ia akan di-hash di models

    // Jangan kembalikan password ke client
    const { password, ...userData } = user.toObject();

    res.status(201).json({
      message: "Registrasi berhasil",
      data: userData,
    });
  } catch (error) {
    next(err);
  }
};

module.exports = { register };
