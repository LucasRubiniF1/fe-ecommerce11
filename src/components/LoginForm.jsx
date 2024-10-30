import React, { useState } from 'react';

const LoginForm = ({ onLogin, error, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden">
      <form
        className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Iniciar sesión en E-Techno
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="mt-2 bg-red-500 text-red p-2 rounded">{error}</p>}
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full border border-indigo-600 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log in
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={onRegister} 
            className="w-full border border-indigo-600 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;


