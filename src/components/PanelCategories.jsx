import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PanelCategories = () => {
    const [showDropdown, setShowDropdown] = useState(false); // Estado para el menú desplegable
    const navigate = useNavigate();

    const handleDropdown = () => {
        setShowDropdown(!showDropdown); // Mostrar/ocultar el menú desplegable
      };

      const goToCategory = (categoryPath) => {
        navigate(`/products/${categoryPath}`); // Navega a la página de productos con la categoría
      };

  return (
    <li
      className="text-black hover:text-gray-600 cursor-pointer relative"
      onMouseEnter={handleDropdown}
      onMouseLeave={handleDropdown}
    >
    Products
              {showDropdown && ( 
                <div className="absolute left-0 mt-0 bg-white border border-gray-200 rounded shadow-lg p-4 grid grid-cols-3 gap-6 w-[710px] z-10 ">
                  {/* Columna 1 */}
                  <div>
                  <ul>
                    <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                    onClick={() => goToCategory('Celular')} 
                    >Celulares y Smartphones</li>
                  </ul>
                  </div>
                  
                  {/* Columna 2 */}
                  <div>
                    <ul>
                      <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                      onClick={() => goToCategory('Camara')} 
                      >Cámaras y Accesorios</li>
                    </ul>
                  </div>
                  
                  {/* Columna 3 */}
                  <div>
                    
                    <ul>
                      <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                      onClick={() => goToCategory('VideoJuegos')} >
                      Consolas y Videojuegos</li>
                    </ul>
                  </div>

                  {/* Columna 4 */}
                  <div>
                    
                    <ul>
                      <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                      onClick={() => goToCategory('Notebook')} 
                      >Computadoras</li>
                    </ul>
                  </div>

                  {/* Columna 5 */}
                  <div>
                    <ul>
                      <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                      onClick={() => goToCategory('Audio y Video')} 
                      >Electrónica, Audio y Video</li>

                    </ul>
                  </div>

                  {/* Columna 6 */}
                  <div>
                    <ul>
                      <li className="font-semibold text-black-600 mb-2 hover:text-blue cursor-pointer"
                      onClick={() => goToCategory('Televisor')} 
                      >Televisores</li>
                    </ul>
                  </div>
                </div>
              
      )}
    </li>
  );
};

export default PanelCategories;
