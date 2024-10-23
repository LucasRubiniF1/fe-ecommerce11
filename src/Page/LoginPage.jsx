import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import users from '../resources/users.json'; 
import axios from 'axios';

const LoginPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/auth/login')
      .then(response => setUsers(response.data)) 
      .catch(error => console.log(error));
  }, []);

  const handleLogin = ({ email, password }) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log("Login successful");
    } else {
      console.log("User not found, redirecting to register");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
