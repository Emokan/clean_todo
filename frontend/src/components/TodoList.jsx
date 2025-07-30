import React, { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import { getTodos, deleteTodo, updateTodo } from "../api";
import { toast } from "react-toastify";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("⚠️ Giriş yapmadan verileri göremezsiniz.");
      return;
    }

    setLoading(true); // Yükleme başladı

    try {
      const { ok, data } = await getTodos(token);
      if (ok) {
        setTodos(data);
      } else {
        toast.error("Veriler alınamadı!");
      }
    } catch (error) {
      console.error("İstek hatası:", error);
      toast.error("Görev verileri alınırken bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const { ok } = await deleteTodo(id, token);
      if (ok) {
        toast.info("Görev silindi.");
        fetchTodos();
      } else {
        toast.error("Silme işlemi başarısız.");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
      toast.error("Sunucu hatası!");
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const { ok } = await updateTodo(id, editingText, token);
      if (ok) {
        toast.success("Görev güncellendi!");
        setEditingId(null);
        fetchTodos();
      } else {
        toast.error("Güncelleme başarısız.");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      toast.error("Sunucu hatası!");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">✅ Yapılacaklar Listesi</h2>
      <CreateTodo onTodoCreated={fetchTodos} />

      {/* Loading durumu */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">⏳ Yükleniyor...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">📭 Henüz hiç görev yok.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded shadow-sm"
            >
              {editingId === todo._id ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 border rounded"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate(todo._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1">{todo.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditingText(todo.text);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Sil
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
