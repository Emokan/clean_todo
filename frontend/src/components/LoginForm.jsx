import React, { useState, useEffect } from "react";
import { loginUser } from "../api"; 
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
        }
    }, [location]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { ok, data } = await loginUser(email, password);
            if (ok) {
                localStorage.setItem("token", data.token);
                if (onLoginSuccess) onLoginSuccess(data.token);
                navigate("/todos");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("İstek hatası:", error);
            setMessage("❌ Giriş sırasında bir hata oluştu.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Giriş Yap
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center text-sm font-medium ${
                    message.includes("başarılı") ? "text-green-600" : "text-red-600"
                }`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoginForm;
