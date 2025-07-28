import React from "react";
import TodoList from "../components/TodoList";

const Home = ({ onLogout }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📋 Görevlerim</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Çıkış Yap
        </button>
      </div>
      <TodoList />
    </div>
  );
};

export default Home;
