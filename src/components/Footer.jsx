import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo y Nombre de la Empresa */}
          <div className="w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl font-semibold">3legant</h2>
            <p className="text-sm text-gray-400">Tu tienda de tecnología en línea</p>
          </div>

          <div className="flex space-x-6 mb-4 sm:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
          </div>

          <div className="w-full sm:w-auto text-center sm:text-right">
            <p className="text-sm">
              <strong>Contacto:</strong> contacto@3legant.com
            </p>
            <p className="text-sm">
              <strong>Teléfono:</strong> +549 1134568943
            </p>
            <p className="text-sm text-gray-400">3legant © 2024 - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
