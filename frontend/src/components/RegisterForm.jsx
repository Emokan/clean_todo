import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { ok, data } = await registerUser(email, password);
      if (ok) {
        navigate("/login", {
        state: { message: "Kayıt başarılı! Giriş yapabilirsiniz." }
        });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("İstek hatası:", error);
      setMessage("❌ Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Kayıt Ol
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-red-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
