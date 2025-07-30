import React, { useState } from "react";
import { createTodo } from "../api";

const CreateTodo = ({ onTodoCreated }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ Giriş yapmadan todo ekleyemezsiniz.");
      return;
    }

    try {
      const { ok, data } = await createTodo(text, token);
      if (ok) {
        toast.success("Görev başariyla eklendi!");
        setText("");
        onTodoCreated();
      } else {
        toast.error("Görev eklenemedi.");
      }
    } catch (err) {
      console.error("İstek hatasi:", err);
      toast.error("Sunucu hatasi!");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Yeni Todo Ekle</h3>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Yapılacak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ekle
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            message.startsWith("✅")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateTodo;
