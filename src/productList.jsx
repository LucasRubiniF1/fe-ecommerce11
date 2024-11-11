import React, { useEffect, useState } from "react";
import "./styles/productList.css"; // Asegúrate de importar el archivo de estilos.

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
