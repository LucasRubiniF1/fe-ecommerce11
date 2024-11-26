import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/CarouselAdm'; // Asegúrate de que este componente funciona correctamente
import axios from 'axios';

const HomeAdm = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);
  const [productsNot, setProductsNot] = useState([]);
  const [productsElec, setProductsElec] = useState([]); // Nuevo estado para Electrónica
  const [productsDest, setProductsDest] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Usuario no autenticado');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8080/products', config);
        const data = response.data;
        console.log('Productos recibidos:', data); // Log para verificar los datos recibidos

        // Filtrar productos por categorías y destacados
        setProductsCel(data.filter((product) => product.category === 'Celular'));
        setProductsTel(data.filter((product) => product.category === 'Televisor'));
        setProductsNot(data.filter((product) => product.category === 'Notebook'));
        setProductsElec(data.filter((product) => product.category === 'Electrónica')); // Filtrar Electrónica
        setProductsDest(data.filter((product) => product.is_featured === true));
      } catch (err) {
        console.error('Error al traer los productos:', err);
        if (err.message === 'Usuario no autenticado') {
          setError('Por favor, inicie sesión para ver los productos.');
        } else {
          setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.');
        }
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

      {productsDest.length > 0 ? (
        <Carousel products={productsDest} titulo="Productos Destacados" />
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay productos destacados para mostrar.</p>
      )}

      {productsCel.length > 0 ? (
        <Carousel products={productsCel} titulo="Celulares" />
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay productos en la categoría de Celulares.</p>
      )}

      {productsTel.length > 0 ? (
        <Carousel products={productsTel} titulo="Televisores" />
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay productos en la categoría de Televisores.</p>
      )}

      {productsNot.length > 0 ? (
        <Carousel products={productsNot} titulo="Notebooks" />
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay productos en la categoría de Notebooks.</p>
      )}

      {productsElec.length > 0 ? (
        <Carousel products={productsElec} titulo="Electrónica" />
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay productos en la categoría de Electrónica.</p>
      )}
    </>
  );
};

export default HomeAdm;
