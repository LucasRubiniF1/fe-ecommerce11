import { useLocation } from 'react-router-dom';


const ProductDetail = () => {
  const location = useLocation();
  const product = location.state;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
      <img
        src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
        alt={product.name}
        className="w-full h-80 object-contain mb-6"
      />
      <p className="text-lg">{product.description}</p>
      <p className="text-2xl font-bold text-green-500 my-4">${product.price}</p>
      <p className="text-gray-500">Stock: {product.stock}</p>
    </div>
  );
};

export default ProductDetail;
