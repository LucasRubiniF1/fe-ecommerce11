import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavbarAdm = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 bg-white relative">
      <h1 className="text-2xl font-bold text-black">3legant</h1>

      <ul className="flex gap-6">
        <li className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/')}>
          Home
        </li>
        <li className="hover:text-gray-400 cursor-pointer" onClick={() => navigate('/products')}>
          Products
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
