import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  cart: [],
  wishlist: [],
  setCart: (cart) => set({ cart }),

  loadWishlist: async (userId) => {
    if (!userId) {
      console.error("userId es necesario para cargar la wishlist.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/wishlist/${userId}`
      );
      set({ wishlist: response.data || [] });
    } catch (error) {
      console.error("Error al cargar la wishlist:", error);
    }
  },

  loadCart: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      set({ cart: response.data });
      localStorage.setItem("cart", JSON.stringify(response.data)); // Guarda el carrito en localStorage
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  },

  initializeCart: () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      // Si hay un carrito en localStorage, lo cargamos
      set({ cart: JSON.parse(savedCart) });
    }
  },

  initializeWishlist: async (userId) => {
    if (!userId) {
      console.error("userId es necesario para cargar la wishlist.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/wishlist?userId=${userId}`
      );

      // Verificamos si la respuesta es un array y tiene contenido
      const wishlist = Array.isArray(response.data) ? response.data : [];
      set({ wishlist });

      // Guardamos la wishlist en localStorage para persistencia
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error al cargar la wishlist:", error);

      // En caso de error, inicializamos la wishlist como un array vacío
      set({ wishlist: [] });
      localStorage.setItem("wishlist", JSON.stringify([]));
    }
  },

  addToCart: async (product, userId) => {
    try {
      // Obtener o crear el carrito del usuario
      console.log("Obteniendo carrito...");
      let userCart = await axios.get(
        `http://localhost:5000/cart?user_id=${userId}`
      );
      userCart = userCart.data[0];

      if (!userCart) {
        console.log("Creando nuevo carrito...");
        userCart = await axios.post(`http://localhost:5000/cart`, {
          user_id: userId,
        });
        userCart = userCart.data;
      }

      // Verifica si el producto ya está en el carrito
      console.log("Verificando producto en el carrito...");
      const cartItemResponse = await axios.get(
        `http://localhost:5000/cartItem?cart_id=${userCart.id}&product_id=${product.id}`
      );
      const existingCartItem = cartItemResponse.data[0];

      if (existingCartItem) {
        console.log("Producto ya en el carrito, incrementando cantidad...");
        await axios.put(
          `http://localhost:5000/cartItem/${existingCartItem.id}`,
          {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          }
        );
      } else {
        console.log("Producto nuevo en el carrito, agregando...");
        await axios.post(`http://localhost:5000/cartItem`, {
          cart_id: userCart.id,
          product_id: product.id,
          quantity: 1,
        });
      }

      // Reducir el stock en `db.json` directamente usando PUT
      try {
        const updatedStock = product.stock - 2; // Cambia el valor 2 por la cantidad que necesitas reducir dinámicamente

        console.log(`Actualizando stock a: ${updatedStock}`);

        const stockResponse = await fetch(
          `http://localhost:5000/products/${product.id}`,
          {
            method: "PUT", // Usamos PUT y enviamos todos los datos del producto
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: product.id,
              name: product.name,
              description: product.description,
              images: product.images,
              price: product.price,
              category: product.category,
              stock: updatedStock,
              is_featured: product.is_featured,
            }),
          }
        );

        if (!stockResponse.ok) {
          throw new Error("Error al actualizar el stock en el servidor");
        }

        const stockData = await stockResponse.json();
        console.log("Stock actualizado exitosamente:", stockData);
      } catch (stockError) {
        console.error("Error específico al actualizar el stock:", stockError);
      }

      // Actualizar el carrito en el frontend
      console.log("Actualizando estado local del carrito...");
      set((state) => {
        const updatedCart = state.cart.find((item) => item.id === product.id)
          ? state.cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    } catch (error) {
      console.error(
        "Error al agregar al carrito y en el flujo general:",
        error
      );
    }
  },

  addToWishlist: async (productId, userId) => {
    if (
      !productId ||
      (typeof productId !== "string" && typeof productId !== "number")
    ) {
      console.error("productId inválido en addToWishlist:", productId);
      return;
    }
    if (!userId) {
      console.error("userId es necesario para agregar a la wishlist.");
      return;
    }

    try {
      // Verifica si el producto ya está en la wishlist del usuario en el servidor
      const wishlistResponse = await axios.get(
        `http://localhost:5000/wishlist?userId=${userId}&productId=${productId}`
      );
      const existingWishlistItem = wishlistResponse.data[0]; // Asumimos que hay solo un registro por usuario y producto

      if (existingWishlistItem) {
        console.warn("Este producto ya está en la wishlist.");
        return;
      }

      // Obtiene la información del producto
      const productResponse = await axios.get(
        `http://localhost:5000/products/${productId}`
      );
      const product = productResponse.data;

      // Agrega el producto a la wishlist en el servidor
      await axios.post(`http://localhost:5000/wishlist`, { userId, productId });

      // Actualiza el estado local y el localStorage
      set((state) => {
        const updatedWishlist = [...state.wishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return { wishlist: updatedWishlist };
      });
    } catch (error) {
      console.error("Error al agregar a la wishlist:", error);
    }
  },

  removeFromCart: (productId) => {
    set((state) => {
      // Filtrar el carrito para excluir el producto con `productId`
      const updatedCart = state.cart.filter((item) => item.id !== productId);

      // Actualizar `localStorage` con el carrito modificado
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Retornar el carrito actualizado en el estado local
      return { cart: updatedCart };
    });
  },

  // Esta función se utilizaría al hacer logout para limpiar el carrito
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart"); // Eliminar el carrito de localStorage
  },

  // Function to remove a product from the wishlist
  removeFromWishlist: async (productId, userId) => {
    try {
      // Remove the product from the backend wishlist
      await axios.delete(
        `http://localhost:5000/wishlist/${userId}/${productId}`
      );

      // Update local state by filtering out the removed product
      const updatedWishlist = useStore
        .getState()
        .wishlist.filter((item) => item.id !== productId);
      useStore.setState({ wishlist: updatedWishlist });

      // Save the updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error al eliminar de la wishlist:", error);
    }
  },

  updateQuantity: async (productId, quantity, userId) => {
    try {
      // Obtener el carrito del usuario
      const userCart = await axios.get(
        `http://localhost:5000/cart?user_id=${userId}`
      );
      const cartId = userCart.data[0].id;

      console.log(
        `Buscando cartItem con product_id: ${productId} y cart_id: ${cartId}`
      );

      // Obtener el elemento específico del carrito
      const cartItemResponse = await axios.get(
        `http://localhost:5000/cartItem?cart_id=${cartId}&product_id=${productId}`
      );
      const cartItem = cartItemResponse.data[0];

      if (!cartItem) {
        console.error("Producto no encontrado en el carrito.");
        return;
      }
      // Actualizar la cantidad en el cartItem
      await axios.put(`http://localhost:5000/cartItem/${cartItem.id}`, {
        ...cartItem, // Mantener los datos existentes como cart_id y product_id
        quantity, // Solo actualizamos la cantidad
      });

      const currentCart = get().cart; // Usa get() para acceder al estado actual

      const updatedCart = currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      set({ cart: updatedCart });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  },

  checkStock: async (productId, quantity) => {
    try {
      // Obtener el producto por su ID
      const productResponse = await axios.get(
        `http://localhost:5000/products/${productId}`
      );
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

useStore.getState().initializeCart();
export default useStore;
