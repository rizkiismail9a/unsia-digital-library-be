const Book = require("../models/books");
const Loan = require("../models/loans");
const Member = require("../models/members");

const getDashboardSummary = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalMembers = await Member.countDocuments();
    const totalLoans = await Loan.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: "Borrowed" });
    const returnedLoans = await Loan.countDocuments({ status: "Returned" });

    // Hitung total buku tersedia (berdasarkan ketersediaan stok atau yang belum dipinjam)
    const books = await Book.find();
    const availableBooks = books.reduce(
      (acc, curr) => acc + (curr.stock || 1),
      0,
    );

    return res.status(200).json({
      success: true,
      data: {
        totalBooks,
        totalMembers,
        totalLoans,
        activeLoans,
        returnedLoans,
        availableBooks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};

module.exports = { getDashboardSummary };
