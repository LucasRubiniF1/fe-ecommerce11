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

  addToCart: async (product, userId) => {
    try {
      // Validar que el producto y el usuario tengan datos válidos
      if (!product || !product.id) {
        throw new Error("Producto inválido.");
      }
      if (!userId) {
        throw new Error("ID de usuario no válido.");
      }
  
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
  
      // Configurar el encabezado con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Realizar la solicitud al servidor
      const response = await axios.post(
        `http://localhost:8080/cart/${userId}/add?productId=${product.id}&quantity=1`,
        {},
        config
      );
  
      // Verificar la respuesta del servidor
      if (response.status !== 200) {
        throw new Error(
          `Error en la solicitud. Código de estado: ${response.status}`
        );
      }
  
      // Actualizar el estado local y el localStorage
      set((state) => {
        const existingProductIndex = state.cart.findIndex(
          (item) => item.id === product.id
        );
  
        let updatedCart;
        if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, actualizar su cantidad
          updatedCart = state.cart.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Si el producto no está en el carrito, agregarlo
          updatedCart = [...state.cart, { ...product, quantity: 1 }];
        }
  
        // Actualizar el carrito en el localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        return { cart: updatedCart };
      });
  
      console.log("Producto agregado al carrito exitosamente.");
    } catch (error) {
      // Manejo de errores detallado
      if (error.response) {
        console.error(
          "Error del servidor:",
          error.response.data || error.response.statusText
        );
  
        // Mostrar mensajes específicos según el código de error
        if (error.response.status === 403) {
          //alert("No tienes permiso para realizar esta acción.");
          window.location.href = "/login"; // Redirigir al login en caso de autenticación fallida
        } else if (error.response.status === 500) {
          alert(
            "No hay stock suficiente del producto"
          );
        } else if (error.response.data && error.response.data.error) {
          // Mostrar mensaje detallado de error desde el servidor
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert(
            `Error al agregar al carrito: ${error.response.data?.message || "Desconocido"}`
          );
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se pudo conectar con el servidor. Por favor, verifica tu red.");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        alert(error.message);
      }
    }
  },

  removeFromCart: async (productId, userId) => {
    try {
      // Verificar que el ID del producto y el ID del usuario sean válidos
      if (!productId || !userId) {
        throw new Error('Producto o usuario no válido.');
      }
  
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
  
      // Configurar el encabezado con el token para la solicitud
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Realizar la solicitud al backend para eliminar el producto del carrito
      const response = await axios.delete(
        `http://localhost:8080/cart/${userId}/items/${productId}`,
        config
      );
  
      // Verificar la respuesta del servidor
      if (response.status !== 200) {
        throw new Error(
          `Error al eliminar el producto del carrito. Código de estado: ${response.status}`
        );
      }
  
      // Actualizar el estado local y el localStorage después de la eliminación
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== productId);
  
        // Actualizar el carrito en el localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
  
        return { cart: updatedCart };
      });
  
      console.log("Producto eliminado del carrito exitosamente.");
    } catch (error) {
      // Manejo de errores detallado
      if (error.response) {
        console.error(
          "Error del servidor:",
          error.response.data || error.response.statusText
        );
  
        // Mostrar mensajes específicos según el código de error
        if (error.response.status === 403) {
          alert("No tienes permiso para realizar esta acción.");
        } else if (error.response.status === 500) {
          alert(
            "Ocurrió un problema con el servidor. Intenta nuevamente más tarde."
          );
        } else {
          alert(
            `Error al eliminar del carrito: ${error.response.data?.message || "Desconocido"}`
          );
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se pudo conectar con el servidor. Por favor, verifica tu red.");
      } else {
        console.error("Error al configurar la solicitud:", error.message);
        alert(error.message);
      }
    }
  },
  
    
  
    // Esta función se utilizaría al hacer logout para limpiar el carrito
    clearCart: () => {
      set({ cart: [] });
      localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
    },
    updateQuantity: async (productId, quantity, userId) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await axios.put(
          `http://localhost:8080/cart/updateQuantity?userId=${userId}&productId=${productId}&quantity=${quantity}`,
          {}, 
          config
        );
    
        if (response.status === 200) {
          console.log("Cantidad actualizada con éxito en el backend.");
    
          // Actualizar el estado local y el `localStorage` después de una respuesta exitosa
          set((state) => {
            const updatedCart = state.cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
          });
          
        } else {
          console.error("Hubo un problema al actualizar la cantidad en el backend:", response.data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud de actualización:", error);
      }
    },
    
    checkStock: async (productId, quantity) => {
      try {
        // Obtener el producto por su ID
        const productResponse = await axios.get(`http://localhost:5000/products/${productId}`);
        const product = productResponse.data;
    
        // Verificar si la cantidad solicitada excede el stock disponible
        if (quantity > product.stock) {
          alert("No hay suficiente stock para la cantidad solicitada.");
          return false; // No hay suficiente stock
        }
        return true; // Hay suficiente stock
      } catch (error) {
        console.error("Error al verificar el stock:", error);
        return false; // Si ocurre un error, devolvemos false por seguridad
      }
    },  
  
  
}));

useStore.getState().initializeCart();
export default useStore;
