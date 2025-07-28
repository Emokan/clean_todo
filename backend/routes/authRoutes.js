console.log("📌 authMiddleware yüklendi");
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// 🔐 Giriş
router.post("/login", loginUser);

// 📝 Kayıt
router.post("/register", registerUser);

module.exports = router;
