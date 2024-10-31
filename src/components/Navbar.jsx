import { useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Estado para el menú desplegable
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

  const handleDropdown = () => {
    setShowDropdown(!showDropdown); // Mostrar/ocultar el menú desplegable
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
<li
  className="text-black hover:text-gray-600 cursor-pointer relative"
  onMouseEnter={handleDropdown}
  onMouseLeave={handleDropdown}
>
Products
          {showDropdown && ( 
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg p-4 grid grid-cols-3 gap-6 w-[700px] z-10 ">
              {/* Columna 1 */}
              <div>
                
                <ul>
                  <li className="font-semibold text-black mb-2">Celulares y Teléfonos</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Celulares y Smartphones</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Accesorios para Celulares</li>
                </ul>
              </div>
              
              {/* Columna 2 */}
              <div>
                <ul>
                  <li className="font-semibold text-black mb-2">Cámaras y Accesorios</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Cámaras Digitales</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Accesorios para Cámaras</li>
                </ul>
              </div>
              
              {/* Columna 3 */}
              <div>
                
                <ul>
                  <li className="font-semibold text-black mb-2">Consolas y Videojuegos</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Videojuegos</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Para PlayStation</li>
                </ul>
              </div>

              {/* Columna 4 */}
              <div>
                
                <ul>
                  <li className="font-semibold text-black mb-2">Computación</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Componentes de PC</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Impresión</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Tablets y Accesorios</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">PC</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Conectividad y Redes</li>
                </ul>
              </div>

              {/* Columna 5 */}
              <div>
                <ul>
                  <li className="font-semibold text-black mb-2">Electrónica, Audio y Video</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Audio</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Accesorios para Audio y Video</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Componentes Electrónicos</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Drones y Accesorios</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Audio para Vehículos</li>
                </ul>
              </div>

              {/* Columna 6 */}
              <div>
                <ul>
                  <li className="font-semibold text-black mb-2">Televisores</li>
                  <li className="text-gray-600 hover:text-blue cursor-pointer">Televisores</li>
                </ul>
              </div>
            </div>
          
  )}
</li>

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
