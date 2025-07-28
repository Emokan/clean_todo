import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Header token={token} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/todos" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/todos"
            element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </Router>
  );
}

function Header({ token, onLogout }) {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">📝 Todo App</h1>
        <nav className="space-x-4">
          {!token && (
            <>
              <Link to="/login" className="hover:underline">Giriş</Link>
              <Link to="/register" className="hover:underline">Kayıt</Link>
            </>
          )}
          {token && (
            <>
              <Link to="/todos" className="hover:underline">Görevler</Link>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Çikiş Yap
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default App;