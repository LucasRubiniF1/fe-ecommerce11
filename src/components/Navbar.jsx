import { useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaHeart } from 'react-icons/fa';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">3legant</h1>

      {/* Enlaces de navegación */}
      <ul className="flex gap-6">
        <li className="text-black hover:text-gray-600 cursor-pointer">Home</li>
        <li className="text-black hover:text-gray-600 cursor-pointer">Shop</li>
        <li className="text-black hover:text-gray-600 cursor-pointer">Product</li>
        <li className="text-black hover:text-gray-600 cursor-pointer">Contact Us</li>
      </ul>

      {/* Barra de búsqueda */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleSearchInput}
          className="border p-2 rounded-lg text-black"
        />
        <button
          onClick={handleSearchClick}
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <FaSearch size={20} />
        </button>
      </div>

      {/* Íconos del usuario */}
      <ul className="flex gap-6 items-center">
        <li className="text-black hover:text-gray-600 cursor-pointer">
          <FaUser size={20} />
        </li>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer">
            <FaShoppingCart size={20} />
          </li>
          <span className="absolute -top-4 -right-2 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer">
            <FaHeart size={20} />
          </li>
          <span className="absolute -top-4 -right-2 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
