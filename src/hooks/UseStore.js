import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
 

  // Función para cargar el carrito
  loadCart: async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      set({ cart: response.data });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  },

  // Función para cargar la wishlist
  loadWishlist: async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:5000/wishlist/${userId}`);
      set({ wishlist: response.data });
    } catch (error) {
      console.error("Error al cargar la wishlist:", error);
    }
  },

  // Función para agregar al carrito
  addToCart: async (product, userId) => {
    if (!userId) return;
    try {
      const response = await axios.post(`http://localhost:5000/cart/${userId}`, product);
      set((state) => ({
        cart: state.cart.find(item => item.id === product.id)
          ? state.cart.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }],
      }));
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  },

  // Función para agregar a la wishlist
  addToWishlist: async (product, userId) => {
    if (!userId) return;
    try {
      const response = await axios.post(`http://localhost:5000/wishlist/${userId}`, product);
      set((state) => ({
        wishlist: [...state.wishlist, product],
      }));
    } catch (error) {
      console.error("Error al agregar a la wishlist:", error);
    }
  },
}));

export default useStore;
