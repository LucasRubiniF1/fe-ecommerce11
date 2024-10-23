import LoginForm from './components/LoginForm';
import './index.css'
import LoginPage from './Page/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './Page/HomePage'; 
import RegisterPage from './Page/RegisterPage'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App
