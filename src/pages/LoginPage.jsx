import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import users from "../resources/users.json";
import axios from "axios";

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleLogin = ({ email, password }) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // Guarda el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", user.id); // Guarda el ID del usuario

      if (user.role === "ADMIN") {
        navigate("/editor"); // Redirige al editor si es admin
      } else {
        navigate("/home"); // Redirige al home si es user
      }
    } else {
      setError("Incorrect username or password");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/*<h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>*/}
        <LoginForm
          onLogin={handleLogin}
          error={error}
          onRegister={handleRegister}
        />
      </div>
    </div>
  );
};

export default LoginPage;
