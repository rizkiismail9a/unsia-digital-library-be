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

module.exports = { getMyProfile };
