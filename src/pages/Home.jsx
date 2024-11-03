import { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';


const Home = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);

  useEffect(() => {
    // Fetch de todos los productos
    fetch(' /data/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProductsCel(data.filter(product => product.category === "Celular"));
        setProductsTel(data.filter(product => product.category === "Televisor"));

        console.log('Productos Celulares:', data.filter(product => product.category === "Celular"));
        console.log('Productos Televisores:', data.filter(product => product.category === "Televisor"));

      })
      .catch((error) => console.error('Error al traer los productos:', error));
  }, []);

  return (
    
    <>
        
        <div className="w-full h-[87vh]">
            <img
              src="/samsung.jpg"
              alt="Imagen destacada"
              className="w-full h-full object-cover"
            />
        </div>
    
        {productsCel.length > 0 && <Carousel products={productsCel} titulo="Celulares" />}
        {productsTel.length > 0 && <Carousel products={productsTel} titulo="Televisores" />}
    
        
          </>
      );
    };

export default Home;