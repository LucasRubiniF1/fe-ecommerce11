import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Registrar
      </h2>

      {/* Campo para el nombre */}
      <div className="mb-4">
        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          placeholder="Nombre"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo para el apellido */}
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          placeholder="Apellido"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo para el nombre de usuario */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          placeholder="Nombre de Usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo para el correo electrónico */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo para la contraseña */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Campo para la fecha de nacimiento */}
      <div className="mb-4">
        <label htmlFor="birth" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input
          type="date"
          id="birth"
          name="birth"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition duration-200"
          value={formData.birth}
          onChange={handleChange}
          required
        />
      </div>

      {/* Botón de envío */}
      <div className="mb-6">
        <button
          type="submit"
          className="w-full border border-indigo-600 text-indigo-600 font-bold py-3 rounded-md hover:bg-indigo-600 hover:text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Registrar
        </button>
      </div>
      {error && (
        <div className="border-2 border-red bg-red-100 text-red text-center p-2 rounded-md mt-4">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;