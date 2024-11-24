import { useState, useEffect } from 'react';
import '../index.css';
import Carousel from '../components/CarouselAdm';
import axios from 'axios';


const HomeAdm = () => {
  const [productsCel, setProductsCel] = useState([]);
  const [productsTel, setProductsTel] = useState([]);
  const [productsNot, setProductsNot] = useState([]);
  const [productsDest, setProductsDest] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener el token desde el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }
  
        // Configurar la cabecera con el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        // Realizar la solicitud al backend
        const response = await axios.get('http://localhost:8080/products', config);
        const data = response.data;
  
        // Filtrar productos por categoría o destacada
        setProductsCel(data.filter(product => product.category === "Celular"));
        setProductsTel(data.filter(product => product.category === "Televisor"));
        setProductsNot(data.filter(product => product.category === "Notebook"));
        setProductsDest(data.filter(product => product.is_featured === true));
      } catch (error) {
        console.error('Error al traer los productos:', error);
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
        {productsDest.length > 0 && <Carousel products={productsDest} titulo="Productos Destacados" />}
        {productsCel.length > 0 && <Carousel products={productsCel} titulo="Celulares" />}
        {productsTel.length > 0 && <Carousel products={productsTel} titulo="Televisores" />}
        {productsTel.length > 0 && <Carousel products={productsNot} titulo="Notebooks" />}

          </>
      );
    };

export default HomeAdm;
