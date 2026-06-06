const { connectDB } = require("../config/db");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const Book = require("../models/books");

const genres = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Technology",
  "Biography",
];

// Factory: generate 1 objek buku
const bookFactory = () => ({
  title: faker.lorem.words({ min: 2, max: 5 }),
  author: faker.person.fullName(),
  genre: faker.helpers.arrayElement(genres),
  isbn: faker.string.numeric(13),
  stock: faker.number.int({ min: 1, max: 50 }),
  published: faker.date.between({ from: "1990-01-01", to: "2024-01-01" }),
});

const seed = async () => {
  await connectDB(); // ← koneksi khusus untuk seeder

  await Book.deleteMany({});
  const books = Array.from({ length: 20 }, bookFactory);
  await Book.insertMany(books);
  console.log("🌱 Selesai!");

  await mongoose.disconnect();
};

seed();
