const API_BASE = "http://localhost:5000/api";

// Kullanıcı girişi
export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

// Kullanıcı kaydı
export const registerUser = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const createTodo = async (text, token) => {
  try {
    const response = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ DİKKAT!
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "İstek hatası" } };
  }
};


export const getTodos = async (token) => {
  try {
    const response = await fetch("http://localhost:5000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return { ok: response.ok, data };
  } catch (error) {
    return { ok: false, data: { message: "İstek hatası" } };
  }
};


export const deleteTodo = async (id, token) => {
    const response = await fetch(`${API_BASE}/todos/${id}`,{
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const updateTodo = async (id, text, token) => {
    const response = await fetch (`${API_BASE}/todos/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};