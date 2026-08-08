const Member = require("../models/members");

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

const getMemberById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Anggota tidak ditemukan" });
    }
    return res.status(200).json({ success: true, data: member });
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

module.exports = { getMembers, getMemberById, createMember };
