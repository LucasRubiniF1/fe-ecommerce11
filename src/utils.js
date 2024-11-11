export const API_URL = 'http://localhost:5001';

const handleSave = async (product) => {
    try {
      await axios.put(`${API_URL}/products/${product.product_id}`, product);
      setEditableProducts(editableProducts.filter(id => id !== product.product_id));
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  