import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/Carousel';
import axios from 'axios';


const Home = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);
  const [productsDest, setProductsDest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        const data = response.data; // Extraer los datos directamente de response
        console.log(data);
        setProductsCel(data.filter(product => product.category === "Celular"));
        setProductsTel(data.filter(product => product.category === "Televisor"));
        setProductsDest(data.filter(product => product.is_featured === true));
      })
      .catch((error) => {
        console.error('Error al traer los productos:', error);
        setError('Error al cargar los productos');
      });
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
        {productsDest.length > 0 && <Carousel products={productsDest} titulo="Productos Destacados" />}
        {productsCel.length > 0 && <Carousel products={productsCel} titulo="Celulares" />}
        {productsTel.length > 0 && <Carousel products={productsTel} titulo="Televisores" />}
    
      
          </>
      );
    };

export default Home;