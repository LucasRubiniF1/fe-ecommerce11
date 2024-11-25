import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/Carousel';
import axios from 'axios';

const Home = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);
  const [productsNot, setProductsNot] = useState([]);
  const [productsDest, setProductsDest] = useState([]);
  const [vistoReciente, setVistoReciente] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
        
        // Llama al backend para obtener los productos
        const response = await axios.get('http://localhost:8080/products');
        const data = response.data;
        console.log('Productos recibidos:', data);
  
        // Actualiza los estados usando las claves correctas
        setProductsCel(data.filter((product) => product.category === 'Electrónica')); // Ajusta "category" según corresponda
        setProductsTel(data.filter((product) => product.category === 'Televisor'));
        setProductsNot(data.filter((product) => product.category === 'Notebook'));
        setProductsDest(data.filter((product) => product.featured === true));
        setVistoReciente(data.filter((product) => product.visto === true)); // Si no tienes "visto", elimina esto
      
    };
  
    fetchProducts();
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

      {error && <p className="text-red-500">{error}</p>}

      {productsDest.length > 0 && <Carousel products={productsDest} titulo="Productos Destacados" />}
      {vistoReciente.length > 0 && <Carousel products={vistoReciente} titulo="Visto Recientemente" />}
      {productsCel.length > 0 && <Carousel products={productsCel} titulo="Celulares" />}
      {productsTel.length > 0 && <Carousel products={productsTel} titulo="Televisores" />}
      {productsNot.length > 0 && <Carousel products={productsNot} titulo="Notebooks" />}
    </>
  );
};

export default Home;
