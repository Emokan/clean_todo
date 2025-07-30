const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
    console.log("📥 getTodos - Kullanıcı bilgisi:", req.user);

    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        console.error("🟥 getTodos HATA:", err);
        res.status(500).json({ message: "Görevler alinmadi.", error: err.message });
    }
};

exports.createTodo = async (req, res) => {
    const { text } = req.body;
    console.log("📨 Gelen istek:", text);
    console.log("📨 Kullanıcı:", req.user);  // Bu satır çok önemli

    try {
        const newTodo = new Todo({ text, userId: req.user.id });
        await newTodo.save();
        console.log("✅ Yeni görev kaydedildi:", newTodo);
        res.status(201).json(newTodo);
    } catch (err) {
        console.error("🟥 Hata (createTodo):", err);  // BU LOG GEREKLİ
        res.status(500).json({ message: "Görev oluşturulamadi.", error: err.message });
    }
};




exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404);
      throw new Error("Görev bulunamadi");
    }

    if (todo.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Yetkisiz");
    }

    await todo.deleteOne();
    res.json({ message: "Görev silindi." });

  } catch (err) {
    console.error("Silme hatasi:", err); // burada konsola log düşecek
    res.status(500);
    throw new Error("Silme Hatasi");
  }
};


exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            res.status(404);
            throw new Error("Görev bulunamadi");
        }

        if (todo.userId.toString() !== req.user.id) {
            res.status(403);
            throw new Error("Yetkisiz");
        }

        todo.text = text;
        await todo.save();

        res.json({ message: "Görev güncellendi.", todo });
    } catch (err) {
        res.status(500);
        throw new Error("Güncelleme Hatasi");
    }
};