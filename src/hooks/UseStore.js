import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set, get) => ({
  cart: [],
  wishlist: [],

  // Cargar wishlist desde el backend
  loadWishlist: async (userId) => {
    if (!userId) {
      console.error('userId es necesario para cargar la wishlist.');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/wishlist/get?userId=${userId}`);
      set({ wishlist: response.data || [] });
    } catch (error) {
      console.error('Error al cargar la wishlist:', error);
    }
  },

  // Inicializar wishlist desde el backend o localStorage
  initializeWishlist: async (userId) => {
    if (!userId) {
      console.error('userId es necesario para cargar la wishlist.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/wishlist/get?userId=${userId}`);
      const wishlist = response.data || [];
      set({ wishlist });

      // Guardamos la wishlist en localStorage para persistencia
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error al cargar la wishlist:', error);

      // En caso de error, inicializamos la wishlist como un array vacío
      set({ wishlist: [] });
      localStorage.setItem('wishlist', JSON.stringify([]));
    }
  },

  // Agregar un producto a la wishlist
  addToWishlist: async (productId, userId) => {
    if (!productId || (typeof productId !== 'string' && typeof productId !== 'number')) {
      console.error('productId inválido en addToWishlist:', productId);
      return;
    }
    if (!userId) {
      console.error('userId es necesario para agregar a la wishlist.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. Por favor, inicia sesión.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:8080/wishlist/add?userId=${userId}&productId=${productId}`,
        {},
        config
      );

      if (response.status === 200) {
        const updatedWishlist = response.data;
        set({ wishlist: updatedWishlist });

        // Actualizar el localStorage
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        console.log(`Producto ${productId} agregado a la wishlist del usuario ${userId}`);
      } else {
        console.error('Error al agregar el producto a la wishlist:', response.data);
      }
    } catch (error) {
      console.error('Error al agregar a la wishlist:', error.response?.data || error.message);
    }
  },

  // Eliminar un producto de la wishlist
  removeFromWishlist: async (productId, userId) => {
    if (!productId || (typeof productId !== 'string' && typeof productId !== 'number')) {
      console.error('productId inválido en removeFromWishlist:', productId);
      return;
    }
    if (!userId) {
      console.error('userId es necesario para eliminar de la wishlist.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado. Por favor, inicia sesión.');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:8080/wishlist/delete?userId=${userId}&productId=${productId}`,
        config
      );

      set((state) => {
        const updatedWishlist = state.wishlist.filter((product) => product.productId !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return { wishlist: updatedWishlist };
      });

      console.log(`Producto ${productId} eliminado de la wishlist del usuario ${userId}`);
    } catch (error) {
      console.error('Error al eliminar de la wishlist:', error.response?.data || error.message);
    }
  },

  // Mover producto de la wishlist al carrito
  moveFromWishlistToCart: async (product, userId) => {
    try {
      await axios.delete(`http://localhost:8080/wishlist/delete?userId=${userId}&productId=${product.productId}`);

      const existsInCart = get().cart.find((item) => item.productId === product.productId);
      if (existsInCart) {
        await axios.put(
          `http://localhost:8080/cart/updateQuantity?userId=${userId}&productId=${product.productId}&quantity=${existsInCart.quantity + 1}`
        );
      } else {
        await axios.post(
          `http://localhost:8080/cart/add?userId=${userId}&productId=${product.productId}&quantity=1`
        );
      }

      set((state) => {
        const updatedWishlist = state.wishlist.filter((item) => item.productId !== product.productId);
        const updatedCart = existsInCart
          ? state.cart.map((item) =>
              item.productId === product.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];
        return { wishlist: updatedWishlist, cart: updatedCart };
      });

      console.log(`Producto ${product.productId} movido de la wishlist al carrito del usuario ${userId}`);
    } catch (error) {
      console.error('Error al mover de wishlist a carrito:', error.response?.data || error.message);
    }
  },

  // Inicializar carrito desde localStorage
  initializeCart: () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      set({ cart: JSON.parse(savedCart) });
    }
  },
}));

useStore.getState().initializeCart();
export default useStore;
