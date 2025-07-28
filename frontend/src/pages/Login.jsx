import React from "react";
import LoginForm from "../components/LoginForm";

const Login = ({ setToken }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onLoginSuccess={setToken} />
    </div>
  );
};

export default Login;
