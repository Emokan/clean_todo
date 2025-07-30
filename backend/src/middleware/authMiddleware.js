const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    console.log("🛡️ Token kontrol middleware çalıştı:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ Token gelmedi.");
        return res.status(401).json({ message: "Yetkisiz erişim. Token eksik." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };  // ✅ BU ÖNEMLİ
        console.log("✅ Token doğrulandı, kullanıcı:", req.user);
        next();
    } catch (err) {
        console.error("❌ Token geçersiz:", err.message);
        return res.status(401).json({ message: "Geçersiz token." });
    }
};

module.exports = authMiddleware;
