import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider'; 

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data)) 
      .catch(error => console.log(error));
  }, []);

  const handleLogin = ({ email, password }) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      if (user.role === 'ADMIN') {
        const token = 'tokenEjempde admin'; 
        login(token, { name: user.firstname });
        navigate('/HomeAdm');  // Redirige al editor si es admin
      } else {
        const token = 'tokenEjemplo123'; // En una implementación real, obtendrás esto de una API
        login(token, { name: user.firstname });
        navigate('/');    // Redirige al home si es user
        console.log(token);
        console.log(user.firstname);
      }
    } else {
      setError('Incorrect username or password');
    }
  };

  const handleRegister = () => {
    navigate('/register'); 
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/*<h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>*/}
        <LoginForm onLogin={handleLogin} error={error} onRegister={handleRegister}/>
        
      </div>
    </div>
  );
};

export default LoginPage;
