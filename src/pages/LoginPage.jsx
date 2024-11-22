import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useAuth } from "../hooks/UseAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        // Realizar la solicitud de login al backend
        const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
            email,
            password,
        });

        // Extraer el token y el id del usuario de la respuesta
        const { token, id } = response.data;

        // Guardar el token y el id en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);

        // Redirigir al usuario a la página de cuenta
        navigate("/account");
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error.response?.data?.message || error.message);
        setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
};


  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4" style={{ width: "20rem" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Ingresa tu Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
          <button
            className="btn btn-primary w-100 mt-2"
            onClick={handleRegister}
          >
            Registrar
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
