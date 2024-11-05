import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/Carousel';
import axios from 'axios';


const Home = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);
  const [productsNot, setProductsNot] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        const data = response.data; // Extraer los datos directamente de response
        setProductsCel(data.filter(product => product.category === "Celular"));
        setProductsTel(data.filter(product => product.category === "Televisor"));
        setProductsNot(data.filter(product => product.category === "Notebook"));
      })
      .catch((error) => {
        console.error('Error al traer los productos:', error);
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
        {productsTel.length > 0 && <Carousel products={productsNot} titulo="Notebooks" />}

          </>
      );
    };

export default Home;