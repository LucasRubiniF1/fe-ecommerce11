import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/Carousel';
import axios from 'axios';


const Home = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);

  useEffect(() => {
    axios.get('public/data/products.json')
      .then((response) => {
        const data = response.data; // Extraer los datos directamente de response
        setProductsCel(data.filter(product => product.category === "Celular"));
        setProductsTel(data.filter(product => product.category === "Televisor"));
      })
      .catch((error) => {
        console.error('Error al traer los productos:', error);
        setError('Error al cargar los productos');
      });
  }, []);
  return (
    
    <>
        
        <div className="w-full h-[89vh]">
            <img
              src="/masSamsungs.jpg"
              alt="Imagen destacada"
              className="w-full h-full"
            />
        </div>
    
        {productsCel.length > 0 && <Carousel products={productsCel} titulo="Celulares" />}
        {productsTel.length > 0 && <Carousel products={productsTel} titulo="Televisores" />}
    
      
          </>
      );
    };

export default Home;