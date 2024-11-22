import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth"; // Importamos el hook de contexto de autenticación

const LoginPage = () => {
  const { login, error } = useAuth(); // Usamos el login y el error del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      
      await login(email, password);
      console.log("Token después del login:", localStorage.getItem("token"));
      console.log("ID del usuario después del login:", localStorage.getItem("userId"));
      navigate("/");
    } catch (err) {
      // El error se maneja a través del contexto, no necesitamos setearlo aquí
      console.error("Error durante el inicio de sesión:", err);
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

          {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar error desde el contexto */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
