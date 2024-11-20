import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../components/registerForm';
import { validateUser, registerUser, getUsersAxios } from "../Services/serviceLogin.js";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    id:null,
    username:'',
    email:'',
    password:'',
    birthDate:'',
    firstname:'',
    lastname:'',
    role:'USER',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsersAxios();
        const lastId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
        setFormData(prev => ({ ...prev, id: lastId + 1 }));
      } catch (error) {
        setError("No se pudo cargar la lista de usuarios.");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetear error al intentar registrar
    setSuccessMessage(false);

    try {
      // Obtener la lista de usuarios para la validación
      const response = await validateUser (formData, setError);
      const users = response.data;

      // Verificar longitud de la contraseña
      if (formData.password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return;
      }

      
      await registerUser(formData, setError);
      
      setSuccessMessage(true);
      //navigate('/'); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError('No se pudo registrar el usuario. Intenta nuevamente más tarde.');
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(false);
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-100"> {/* Aumentar el ancho del cuadro */}
            <h2 className="text-lg font-semibold text-gray-800 text-center">Usuario registrado exitosamente!</h2>
            <div className="flex justify-center mt-4"> {/* Centrar el botón */}
              <button
                className="bg-white text-black font-bold py-2 px-4 border border-gray-300 rounded hover:bg-gray-100 transition duration-200"
                onClick={handleCloseSuccess}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <RegisterForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default RegisterPage;