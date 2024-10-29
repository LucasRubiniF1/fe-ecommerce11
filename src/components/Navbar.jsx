import { FaUser, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Asegúrate de haber importado useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Inicializa useNavigate aquí

  const handleUserClick = () => {
    try {
      navigate("/account"); // Redirige a la página de My Account
    } catch (error) {
      console.error("Error navigating to /account:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-black">3legant</h1>

      {/* Enlaces de navegación */}
      <ul className="flex gap-6">
        <li className="text-black hover:text-gray-600 cursor-pointer">Home</li>
        <li className="text-black hover:text-gray-600 cursor-pointer">Shop</li>
        <li className="text-black hover:text-gray-600 cursor-pointer">
          Product
        </li>
        <li className="text-black hover:text-gray-600 cursor-pointer">
          Contact Us
        </li>
      </ul>

      {/* Íconos del usuario */}
      <ul className="flex gap-6 items-center">
        <li className="text-black hover:text-gray-600 cursor-pointer">
          <FaSearch size={20} />
        </li>
        <li
          className="text-black hover:text-gray-600 cursor-pointer"
          onClick={handleUserClick}
        >
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
