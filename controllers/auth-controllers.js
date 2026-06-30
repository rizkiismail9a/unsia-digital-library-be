const User = require("../models/users");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils/userToken");

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

    const accessToken = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: userData,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(401).json({ message: "Email atau kata sandi salah" });
    }

    // Bandingkan kata sandi
    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );

    if (!isPassCorrect) {
      return res.status(401).json({ message: "Email atau kata sandi salah" });
    }

    const accessToken = await generateTokens(existingUser);

    const { password, ...userData } = existingUser.toObject();

    return res.status(200).json({
      success: true,
      message: "Login berhasil",
      user: userData,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login };
