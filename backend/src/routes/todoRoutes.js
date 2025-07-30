const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getTodos, createTodo, deleteTodo, updateTodo } = require("../controllers/todoController");

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.put("/:id", authMiddleware, updateTodo);

module.exports = router;
