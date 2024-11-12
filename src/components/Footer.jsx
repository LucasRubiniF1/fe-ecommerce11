import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
          {/* Logo y Nombre de la Empresa */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-white">3legant</h2>
          </div>

          {/* Enlaces de Redes Sociales */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
          </div>

          {/* Información de Contacto y Derechos */}
          <div className="text-center sm:text-right text-sm space-y-1">
            <p>contacto@3legant.com | +549 1134568943</p>
            <p className="text-gray-500">© 2024 3legant</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
