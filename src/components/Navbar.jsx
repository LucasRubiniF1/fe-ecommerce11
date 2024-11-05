import { useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import PanelCategories from './PanelCategories'

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/productSearch?query=${searchTerm}`);
  };

  const handleUserClick = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <nav className="flex items-center justify-between p-2 bg-white relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black" onClick={goToHome}>3legant</h1>

      {/* Enlaces de navegación */}
      <ul className="flex gap-6">
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={goToHome}>Home</li>

       {/* Menú desplegable para Productos */}
      <PanelCategories/>

        <li className="text-black hover:text-gray-600 cursor-pointer">Contact Us</li>
      </ul>

      {/* Íconos del usuario */}
      <ul className="flex gap-6 items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchInput}
          className="w-96 border border-gray-300 p-2 rounded-md text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200"
        />
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleSearchClick}>
          <FaSearch size={20} />
        </li>
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleUserClick}>
          <FaUser size={20} />
        </li>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleCartClick}>
            <FaShoppingCart size={20} />
          </li>
        
        </div>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleWishlistClick}>
            <FaHeart size={20} />
          </li>
          
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
