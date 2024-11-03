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
    onSearch(searchTerm);
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
    <nav className="flex items-center justify-between p-4 bg-white relative">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">3legant</h1>

      {/* Enlaces de navegación */}
      <ul className="flex gap-6">
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={goToHome}>Home</li>
        {/*<li className="text-black hover:text-gray-600 cursor-pointer">Shop</li>*/}

       {/* Menú desplegable para Productos */}
      <PanelCategories/>

        <li className="text-black hover:text-gray-600 cursor-pointer">Contact Us</li>
      </ul>

      {/* Barra de búsqueda expandible */}
      {showSearchBar && (
        <div className="flex items-center gap-2 ml-7">
          <input
            type="text"
            placeholder="Buscar por nombre o categoría"
            value={searchTerm}
            onChange={handleSearchInput}
            className="border p-2 rounded-lg text-black"
          />
          <button
            onClick={handleSearchClick}
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Buscar
          </button>
        </div>
      )}

      {/* Íconos del usuario */}
      <ul className="flex gap-6 items-center">
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={toggleSearchBar}>
          <FaSearch size={20} />
        </li>
        <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleUserClick}>
          <FaUser size={20} />
        </li>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleCartClick}>
            <FaShoppingCart size={20} />
          </li>
           {/* <span className="absolute -top-4 -right-2 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
          */}
        </div>
        <div className="relative">
          <li className="text-black hover:text-gray-600 cursor-pointer" onClick={handleWishlistClick}>
            <FaHeart size={20} />
          </li>
          
           {/* <span className="absolute -top-4 -right-2 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
          */}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
