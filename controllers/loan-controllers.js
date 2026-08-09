const Book = require("../models/books");
const Loan = require("../models/loans");
const Member = require("../models/members");

const getLoans = async (req, res, next) => {
  try {
    // Melihat semua pinjaman hanya untuk admin saja
    if (req.user) {
      const isAdmin = req.user.role === "admin";

      if (isAdmin) {
        const loans = await Loan.find()
          .populate("book", "title author isbn category")
          .populate("member", "nim name email prodi")
          .populate("createdBy", "name email")
          .sort({ createdAt: -1 });

        return res.status(200).json({
          success: true,
          count: loans.length,
          data: loans,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Akses hanya untuk admin",
        });
      }
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

const getMyLoans = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    // 1. Cari profil Member yang terhubung dengan User yang sedang login (berdasarkan email atau NIM)
    const member = await Member.findOne({
      $or: [
        { email: req.user.email },
        ...(req.user.nim ? [{ nim: req.user.nim }] : []),
      ],
    });

    // 2. Kumpulkan target ID untuk query peminjaman
    const searchTargets = [];
    if (member) searchTargets.push(member._id);
    if (req.user._id) searchTargets.push(req.user._id);

    // 3. Susun kueri filter
    const filter = {
      $and: [
        {
          $or: [
            { member: { $in: searchTargets } },
            { createdBy: req.user._id },
          ],
        },
        { status: "Borrowed" },
      ],
    };

    // Dukungan filter query parameter opsional (misal: /api/loans/my-loans?status=Borrowed)
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // 4. Ambil data peminjaman beserta detail informasi buku
    const loans = await Loan.find(filter)
      .populate(
        "book",
        "title author isbn coverImage category publisher year stock",
      )
      .populate("member", "nim name email prodi")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    next(error);
  }
};

const createLoan = async (req, res, next) => {
  try {
    const { bookId, memberId, dueDate, notes } = req.body;

    // Cek ketersediaan anggota
    const memberExists = await Member.findById(memberId);

    if (!memberExists) {
      return res
        .status(404)
        .json({ success: false, message: "Anggota tidak ditemukan" });
    }

    // Cek ketersediaan buku & stok/status
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Buku tidak ditemukan" });
    }

    if (book.stock !== undefined && book.stock <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Stok buku sedang kosong" });
    }

    // Validasi Tambahan: Cek apakah anggota sedang meminjam buku yang sama dan belum dikembalikan
    const existingActiveLoan = await Loan.findOne({
      member: memberId,
      book: bookId,
      status: "Borrowed",
    });

    if (existingActiveLoan) {
      return res.status(400).json({
        success: false,
        message:
          "Anggota ini masih meminjam buku yang sama dan belum mengembalikannya",
      });
    }

    const loan = new Loan({
      book: bookId,
      member: memberId,
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      notes: notes || "",
      createdBy: req.user ? req.user._id : null,
    });

    await loan.save();

    // Kurangi stok buku jika properti stok ada
    if (book.stock !== undefined && book.stock > 0) {
      book.stock -= 1;
      await book.save();
    }

    const populatedLoan = await Loan.findById(loan._id)
      .populate("book", "title author")
      .populate("member", "nim name");

    return res.status(201).json({
      success: true,
      message: "Transaksi peminjaman berhasil dicatat",
      data: populatedLoan,
    });
  } catch (error) {
    next(error);
  }
};

const returnLoan = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res
        .status(404)
        .json({ success: false, message: "Data peminjaman tidak ditemukan" });
    }

    if (loan.status === "Returned") {
      return res.status(400).json({
        success: false,
        message: "Buku sudah dikembalikan sebelumnya",
      });
    }

    loan.status = "Returned";

    loan.returnDate = new Date();

    await loan.save();

    // Tambahkan kembali stok buku jika ada
    const book = await Book.findById(loan.book);
    if (book && book.stock !== undefined) {
      book.stock += 1;
      await book.save();
    }

    return res.status(200).json({
      success: true,
      message: "Buku berhasil dikembalikan",
      data: loan,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLoans, returnLoan, createLoan, getMyLoans };
