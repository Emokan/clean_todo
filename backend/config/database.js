// config/db.js
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB bağlantısı başarılı");
  } catch (err) {
    console.error("❌ MongoDB bağlantı hatası:", err);
    process.exit(1); // sunucuyu durdurur
  }
};
module.exports = connectDB;
