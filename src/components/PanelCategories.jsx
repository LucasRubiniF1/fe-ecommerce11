import { useState } from 'react';

const PanelCategories = () => {
    const [showDropdown, setShowDropdown] = useState(false); // Estado para el menú desplegable

    const handleDropdown = () => {
        setShowDropdown(!showDropdown); // Mostrar/ocultar el menú desplegable
      };
  return (
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
  );
};

export default PanelCategories;
