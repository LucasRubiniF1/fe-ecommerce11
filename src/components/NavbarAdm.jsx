import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavbarAdm = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleNavigateToCreate = () => {
    navigate("/product/create");
  };
  const handleNavigateToEdit = () => {
    navigate("/product/edit");
  };
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="flex items-center justify-between p-2 bg-white relative">
      <h1 className="text-3xl font-bold text-slate-500">3legant</h1>

      <ul className="flex gap-6">
        <li className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/')}>
          Home
        </li>

        <li
          className="text-black hover:text-gray-600 cursor-pointer relative"
          onMouseEnter={handleDropdown}
          onMouseLeave={handleDropdown}
        >
          Products
          {showDropdown && (
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg p-4 grid grid-cols-3 gap-6 w-[700px] z-10">
              <ul>
                <li className="text-gray-600 hover:text-blue cursor-pointer" onClick={handleNavigateToCreate}>
                  Create
                </li>
                <li className="text-gray-600 hover:text-blue cursor-pointer" onClick={handleNavigateToEdit}>
                  Update/Delete
                </li>
              </ul>
            </div>
          )}
        </li>
        
        <li className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/account')}>
          Account
        </li>
      </ul>
      <div className="flex items-center">
        <FaUser size={24} className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/account')} />
      </div>
    </nav>
  );
};

export default NavbarAdm;
