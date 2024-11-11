import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function ContactPage() {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg shadow-lg mt-12 max-w-5xl">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Contáctanos</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Información de Contacto */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros a través de nuestro formulario o la información que aparece a continuación.
          </p>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Correo Electrónico</p>
              <p className="text-gray-600">contacto@3legant.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhone className="text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Teléfono</p>
              <p className="text-gray-600">+54 9 11 3456-8943</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-blue-500" />
            <div>
              <p className="text-lg font-semibold text-gray-800">Dirección</p>
              <p className="text-gray-600">Av. Corrientes 2285, Ciudad Autonoma de Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200"
                placeholder="tucorreo@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full g-gray-600 py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
