import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch de todos los productos
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.filter(product => product.category === "Electrónica"));
      })
      .catch((error) => console.error('Error al traer los productos:', error));
  }, []);

  return (
    
<>
    <Navbar />    
    <div className="w-full h-[87vh]">
        <img
          src="/galaxy.jpg"
          alt="Imagen destacada"
          className="w-full h-full object-cover"
        />
    </div>

    {products.length > 0 && <Carousel products={products} />}
      </>
  );
};

export default Home;