const Member = require("../models/members");
const User = require("../models/users");

const getMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

const getMyMembership = async (req, res, next) => {
  try {
    if (req.user) {
      const member = await Member.findOne({ email: req.user.email });
      if (!member) {
        return res
          .status(404)
          .json({ success: false, message: "Anggota tidak ditemukan" });
      }
      return res.status(200).json({ success: true, data: member });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Login lebih dulu" });
    }
  } catch (error) {
    next(error);
  }
};

const createMember = async (req, res, next) => {
  try {
    const { nim, phone, prodi, status } = req.body;

    const existingNim = await Member.findOne({ nim });

    if (existingNim) {
      return res
        .status(400)
        .json({ success: false, message: "NIM sudah terdaftar" });
    }

    if (req.user) {
      const member = await Member.create({
        nim,
        name: req.user.name,
        email: req.user.email,
        phone,
        prodi,
        status,
      });

      // Update role user yang login menjadi "member"
      await User.findByIdAndUpdate(req.user._id || req.user.id, {
        role: "member",
      });

      return res.status(201).json({
        success: true,
        message: "Anggota berhasil ditambahkan",
        data: member,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getMembers, getMyMembership, createMember };
