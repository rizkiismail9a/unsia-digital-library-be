const User = require("../models/users");

const getMyProfile = async (req, res, next) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    }

    return res.status(404).json({
      success: false,
      message: "User tidak ditemukan",
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      const allUsers = await User.find({ deletedAt: null }, { password: 0 });

      if (allUsers) {
        return res.status(200).json({
          success: true,
          data: allUsers,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Anda tidak diizinkan menggunakan API ini",
      });
    }
  } catch (error) {
    next(error);
  }
};

const countRegisteredUsers = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      const allUsers = await User.find({ deletedAt: null }, { password: 0 });

      if (allUsers) {
        return res.status(200).json({
          success: true,
          registeredUsers: allUsers.length,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Anda tidak diizinkan menggunakan API ini",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyProfile, getAllUsers, countRegisteredUsers };
