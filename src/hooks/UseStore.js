import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  loadCart: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      set({ cart: response.data });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  },

  loadWishlist: async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/wishlist/${userId}`
      );
      set({ wishlist: response.data });
    } catch (error) {
      console.error("Error al cargar la wishlist:", error);
    }
  },

  addToCart: async (product, userId) => {
    try {
      await axios.post(`http://localhost:5000/cart/${userId}`, product);
      set((state) => ({
        cart: state.cart.find((item) => item.id === product.id)
          ? state.cart.map((item) =>
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

  removeFromCart: async (productId, userId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      }));
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  },

  addToWishlist: async (product, userId) => {
    const { wishlist } = useStore.getState();
    if (wishlist.some((item) => item.id === product.id)) {
      console.warn("Este producto ya está en la wishlist.");
      return;
    }
    try {
      await axios.post(`http://localhost:5000/wishlist/${userId}`, product);
      set((state) => ({
        wishlist: [...state.wishlist, product],
      }));
    } catch (error) {
      console.error("Error al agregar a la wishlist:", error);
    }
  },

  removeFromWishlist: async (productId, userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/wishlist/${userId}/${productId}`
      );
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== productId),
      }));
    } catch (error) {
      console.error("Error al eliminar de la wishlist:", error);
    }
  },

  updateQuantity: async (productId, quantity, userId) => {
    try {
      await axios.put(`http://localhost:5000/cart/${userId}/${productId}`, {
        quantity,
      });
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  },

  moveFromWishlistToCart: async (product, userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/wishlist/${userId}/${product.id}`
      );

      const existsInCart = await axios.get(
        `http://localhost:5000/cart/${userId}/${product.id}`
      );
      if (existsInCart.data) {
        await axios.put(`http://localhost:5000/cart/${userId}/${product.id}`, {
          quantity: existsInCart.data.quantity + 1,
        });
      } else {
        await axios.post(`http://localhost:5000/cart/${userId}`, {
          ...product,
          quantity: 1,
        });
      }

      set((state) => {
        const wishlist = state.wishlist.filter(
          (item) => item.id !== product.id
        );
        const cart = state.cart.find((item) => item.id === product.id)
          ? state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];
        return { wishlist, cart };
      });
    } catch (error) {
      console.error("Error al mover de wishlist a carrito:", error);
    }
  },
}));

export default useStore;
