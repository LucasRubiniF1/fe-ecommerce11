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
      try {
        // Obtén el token almacenado (supongo que está en localStorage)
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Usuario no autenticado');
        }

        // Configura los headers con el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Llama al backend para obtener los productos
        const response = await axios.get('http://localhost:8080/products', config);
        const data = response.data;

        // Filtra y organiza los productos
        setProductsCel(data.filter((product) => product.category === 'Celular'));
        setProductsTel(data.filter((product) => product.category === 'Televisor'));
        setProductsNot(data.filter((product) => product.category === 'Notebook'));
        setProductsDest(data.filter((product) => product.is_featured === true));
        setVistoReciente(data.filter((product) => product.visto === true));
      } catch (err) {
        console.error('Error al traer los productos:', err);
        setError('No se pudieron cargar los productos.');
      }
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
