# **Preview**

Repository ini berisi kode backend untuk layanan server Unsia Digital Library yang saya bernama HappyLibrary yang dapat diakses pada https://unsia-happy-library.netlify.app/. Repository ini dibuat untuk memenuhi tugas Ujian Akhir Semester Universitas Siber Asia pada mata kuliah Pemrograman Web II.

Server ini ditulis menggunakan Node Js dengan Express Js sebagai layanan web server serta MongoDB sebagai DBMS. Berikut ini adalah tata cara instalasi Unsia Digital Library BE di lokal:

## Cara Instalasi

### Prasyarat
Sebelum instalasi, pastikan telah menginstal Node Js versi 22 ke atas, disarankan versi LTS, untuk menghindari masalah akibat perbedaan versi Node Js

1. Clone repository
   Silakan clone repository ini pada komputer Anda melalui fitur unduh atau clone dari Github
2. Instalasi
   Buka terminal pada repository dan jalankan perintah berikut.

  `npm install`

   Perintah ini akan menginstal semua isi package.json
   
4. Isi environment variabel sesuai .env.example
5. Jalankan server
   Buka terminal, jalankan perintah berikut
   `node server.js`
   Aplikasi pun akan berjalan pada `http://localhost:8000` 
