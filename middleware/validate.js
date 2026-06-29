const requestValidator = (schema) => {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false, // tampilkan SEMUA error sekaligus
        stripUnknown: true, // buang field yang tidak ada di schema
      });

      if (error) {
        return res.status(400).json({
          message: "Validasi gagal",
          errors: error.details.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }

      req.body = value; // pakai value yang sudah di-sanitasi
      next();
    } catch (err) {
      console.error("Gagal menambahkan buku: ", err);
    }
  };
};

module.exports = { requestValidator };
