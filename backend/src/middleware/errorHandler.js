const errorHandler = (err, req, res, next) => {
    console.error("❌ Hata:", err.stack);

    const statusCode = res.statusCode === 200 ? 200 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Sunucu hatasi oluştu.",
    });
};

module.exports = errorHandler;