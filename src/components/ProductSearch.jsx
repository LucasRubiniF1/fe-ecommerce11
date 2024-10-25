// src/pages/ProductSearch.jsx
import React from 'react';
import useFetch from '../hooks/useFetch';

const ProductSearch = () => {
    const { data: products, loading, error } = useFetch('/data/products.json');

    if (loading) {
        return <p>Cargando productos...</p>; // Mensaje de carga
    }

    if (error) {
        return <p>Error al cargar productos: {error}</p>; // Mensaje de error
    }

    if (!products || products.length === 0) {
        return <p>No hay productos disponibles.</p>; // Manejo de productos vacíos
    }

    return (
        <div>
            <h1>Lista de Productos</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSearch;
