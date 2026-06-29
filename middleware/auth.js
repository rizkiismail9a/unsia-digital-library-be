const User = require("../models/users");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Harus lowercase, express akan konversi ke lowercase secara otomatis
    const authorization = req.headers.authorization || "";

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak. Token tidak ditemukan atau tidak valid",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Akses ditolak. Token tidak ditemukan atau tidak valid(2)",
      });
    }

    const decode = jwt.decode(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    // Cari user di database
    const user = await User.findById(decode.sub);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan.",
      });
    }

    const { password, ...userData } = user.toObject();

    req.user = userData;

    return next();
  } catch (error) {
    console.log(error);

    const message =
      error.name === "TokenExpiredError"
        ? "Token sudah kedaluwarsa."
        : "Token tidak valid atau sudah dimodifikasi.";
    return res.status(401).json({ success: false, message });
  }
};

module.exports = authMiddleware;
