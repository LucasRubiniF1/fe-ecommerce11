import { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PanelCategories from "./PanelCategories";
import { useAuth } from "../hooks/UseAuth.js";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    await logout();
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
      <h1 className="text-3xl font-bold text-slate-500" onClick={goToHome}>
        3legant
      </h1>

      {/* Enlaces de navegación */}
      <ul className="flex gap-6">
        <li
          className="text-black hover:text-gray-600 cursor-pointer"
          onClick={goToHome}
        >
          Home
        </li>

        {/* Menú desplegable para Productos */}
        <PanelCategories />

        <li className="text-black hover:text-gray-600 cursor-pointer">
          Contact Us
        </li>
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
        <li
          className="text-black hover:text-gray-600 cursor-pointer"
          onClick={handleSearchClick}
        >
          <FaSearch size={20} />
        </li>
        {user ? (
          <div className="relative">
            {/* Mostrar el nombre del usuario si esta logueado */}
            <li className="font-semibold text-black hover:text-gray-600 cursor-pointer">
              Hola {user.firstname}!
            </li>
          </div>
        ) : (
          <li
            className="text-black hover:text-gray-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <FaUser size={20} />
          </li>
        )}
        <div className="relative">
          <li
            className="text-black hover:text-rose-600 cursor-pointer"
            onClick={handleWishlistClick}
          >
            <FaHeart size={20} />
          </li>
        </div>
        <div className="relative">
          <li
            className="text-black hover:text-gray-600 cursor-pointer"
            onClick={handleCartClick}
          >
            <FaShoppingCart size={20} />
          </li>
        </div>
        
      </ul>
    </nav>
  );
};

export default Navbar;
