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
      // Intenta iniciar sesión
      await login(email, password);
  
      // Verifica si el token y el ID del usuario se almacenaron correctamente
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
  
      if (token && userId) {
        console.log("Token después del login:", token);
        console.log("ID del usuario después del login:", userId);
  
        // Navega a la página principal solo si el inicio de sesión fue exitoso
        navigate("/");
      } else {
        console.error("Faltan datos del token o del usuario después del login");
        setError("Error al obtener los datos del usuario. Intenta nuevamente.");
      }
    } catch (err) {
      // Manejo de errores
      if (err.response) {
        if (err.response.status === 403 || err.response.status === 401) {
          // Mostrar un mensaje de credenciales incorrectas
          setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.");
        } else {
          setError(`Error inesperado: ${err.response.statusText}`);
        }
      } else if (err.request) {
        console.error("No se recibió respuesta del servidor:", err.request);
        setError("No se pudo conectar con el servidor. Por favor, verifica tu red.");
      } else {
        console.error("Error al configurar la solicitud:", err.message);
        setError("Ocurrió un error desconocido. Por favor, intenta nuevamente.");
      }
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
  
          {/* Mostrar el error aquí */}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
  
};

export default LoginPage;
