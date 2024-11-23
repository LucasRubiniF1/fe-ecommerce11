import { create } from 'zustand';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:5000/wishlist/${userId}`);
      set({ wishlist: response.data || [] });
    } catch (error) {
      console.error("Error al cargar la wishlist:", error);
    }
  },

  loadCart: async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      set({ cart: response.data });
      localStorage.setItem('cart', JSON.stringify(response.data)); // Guarda el carrito en localStorage
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  },

  initializeCart: () => {
    const savedCart = localStorage.getItem('cart');
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
    // Realiza una solicitud GET para traer al usuario y su wishlist
    const response = await axios.get(`http://localhost:5000/users/${userId}`);

    // Obtiene la wishlist del usuario
    const user = response.data;
    const wishlist = user.wishlist || [];

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
    let userCart = await axios.get(`http://localhost:5000/cart?user_id=${userId}`);
    userCart = userCart.data[0]; // Asumimos que hay solo un carrito por usuario
    
    if (!userCart) {
      userCart = await axios.post(`http://localhost:5000/cart`, { user_id: userId });
      userCart = userCart.data;
    }

    // Obtener la información del usuario
    let userRespon = await axios.get(`http://localhost:5000/users/${userId}`);
    let userRes = userRespon.data;

    // Inicializar el carrito en el JSON del usuario si no existe
    if (!userRes.cart) {
      userRes.cart = { cart_id: userCart.id, items: [] };
    }

    // Buscar el producto en `cartItem`
    const cartItemResponse = await axios.get(`http://localhost:5000/cartItem?cart_id=${userCart.id}&product_id=${product.id}`);
    const existingCartItem = cartItemResponse.data[0];

    if (existingCartItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad en `cartItem`
      await axios.put(`http://localhost:5000/cartItem/${existingCartItem.id}`, {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      });
    } else {
      // Si el producto no está en el carrito, lo agregamos a `cartItem`
      await axios.post(`http://localhost:5000/cartItem`, {
        cart_id: userCart.id,
        product_id: product.id,
        quantity: 1,
      });
    }

    // Actualizar el JSON de `user.cart.items`
    let userCartItem = userRes.cart.items.find(item => item.product_id === product.id);

    if (userCartItem) {
      userCartItem.quantity += 1; // Incrementar cantidad si el producto ya existe en el JSON
    } else {
      // Si el producto no está en el JSON del usuario, agregarlo con nuevo `cartItem_id`
      const lastCartItem = userRes.cart.items.length > 0 ? userRes.cart.items[userRes.cart.items.length - 1] : { cartItem_id: 0 };
      const newCartItemId = lastCartItem.cartItem_id + 1;

      userRes.cart.items.push({
        cartItem_id: newCartItemId,
        product_id: product.id,
        quantity: 1,
      });
    }

    // Actualizar el JSON del usuario con el nuevo carrito
    await axios.put(`http://localhost:5000/users/${userId}`, userRes);

    // Actualizar el estado local y el `localStorage`
    set((state) => {
      const updatedCart = state.cart.find(item => item.id === product.id)
        ? state.cart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });

  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }
},


addToWishlist: async (productId, userId) => {
  if (!productId || (typeof productId !== "string" && typeof productId !== "number")) {
    console.error("productId inválido en addToWishlist:", productId);
    return;
  }
  if (!userId) {
    console.error("userId es necesario para agregar a la wishlist.");
    return;
  }

  try {
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

    // Llamar al backend para agregar el producto a la wishlist del usuario
    await axios.post(
      `http://localhost:8080/wishlist/add?userId=${userId}&productId=${productId}`,
      {}, // Body vacío, ya que no es necesario enviar datos en el body
      config
    );

    // Actualizar el estado local y el `localStorage`
    set((state) => {
      const updatedWishlist = [...state.wishlist, productId];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlist: updatedWishlist };
    });

    console.log(`Producto ${productId} agregado a la wishlist del usuario ${userId}`);
  } catch (error) {
    console.error("Error al agregar a la wishlist:", error.response?.data || error.message);
  }
},



  removeFromCart: async (productId, userId) => {
    try {
      // Obtener el carrito del usuario
      let userCart = await axios.get(`http://localhost:5000/cart?user_id=${userId}`);
      userCart = userCart.data[0];
  
      if (!userCart) {
        console.error('Carrito no encontrado');
        return;
      }
  
      // Buscar el cartItem correspondiente al producto
      const cartItemResponse = await axios.get(`http://localhost:5000/cartItem?cart_id=${userCart.id}&product_id=${productId}`);
      const cartItemToDelete = cartItemResponse.data[0];
  
      if (cartItemToDelete) {
        // Eliminar el cartItem del backend
        await axios.delete(`http://localhost:5000/cartItem/${cartItemToDelete.id}`);
  
        // Obtener el usuario para modificar el JSON de `user.cart.items`
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = userResponse.data;
  
        // Filtrar el item a eliminar en el JSON de usuario
        const updatedCartItems = user.cart.items.filter(item => item.product_id !== productId);
  
        // Actualizar el usuario con el carrito modificado
        await axios.put(`http://localhost:5000/users/${userId}`, {
          ...user,
          cart: {
            ...user.cart,
            items: updatedCartItems
          }
        });
  
        // Actualizar el carrito en el estado local
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return { cart: updatedCart };
        });
  
      } else {
        console.error('Producto no encontrado en el carrito.');
      }
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  },
  

  // Esta función se utilizaría al hacer logout para limpiar el carrito
  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem('cart'); // Eliminar el carrito de localStorage
  },


  
  
  // Function to remove a product from the wishlist
  removeFromWishlist: async (productId, userId) => {
    try {
      const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
      const user = userResponse.data;
      const updatedWishlist = user.wishlist.filter(item => item.product_id != productId);

      await axios.put(`http://localhost:5000/users/${userId}`, {
        ...user,
        wishlist: updatedWishlist
      });
      
      // Actualizar el estado local y localStorage
      useStore.setState({ wishlist: updatedWishlist });
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error al eliminar de la wishlist:", error);
    }
  },


  updateQuantity: async (productId, quantity, userId) => {
    try {
      const userCart = await axios.get(`http://localhost:5000/cart?user_id=${userId}`);
      const cartId = userCart.data[0]?.id;
    
      if (!cartId) {
        console.error("Carrito no encontrado para el usuario.");
        return;
      }
  
      console.log(`Buscando cartItem con product_id: ${productId} y cart_id: ${cartId}`);
  
      // Obtener el elemento específico del carrito
      const cartItemResponse = await axios.get(`http://localhost:5000/cartItem?cart_id=${cartId}&product_id=${productId}`);
      const cartItem = cartItemResponse.data[0];
  
      if (!cartItem) {
        console.error("Producto no encontrado en el carrito.");
        return;
      }
  
      // Actualizar la cantidad en el cartItem
      await axios.put(`http://localhost:5000/cartItem/${cartItem.id}`, {
        ...cartItem,  // Mantener los datos existentes como cart_id y product_id
        quantity      // Solo actualizamos la cantidad
      });
  
      // Actualizar la cantidad en el JSON del usuario en `user.cart.items`
      const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
      let user = userResponse.data;
  
      // Verificar y actualizar el producto en el JSON de `user.cart.items`
      const userCartItem = user.cart?.items?.find(item => item.product_id === productId);
      if (userCartItem) {
        userCartItem.quantity = quantity; // Actualizar la cantidad
      } else {
        console.warn("Producto no encontrado en el JSON de usuario.");
      }
  
      // Enviar la actualización del JSON de usuario al servidor
      await axios.put(`http://localhost:5000/users/${userId}`, user);
  
      // Actualizar el estado local y el `localStorage`
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
  
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
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
  
  

  moveFromWishlistToCart: async (product, userId) => {
    try {
      await axios.delete(`http://localhost:5000/wishlist/${userId}/${product.id}`);
      
      const existsInCart = await axios.get(`http://localhost:5000/cart/${userId}/${product.id}`);
      if (existsInCart.data) {
        await axios.put(`http://localhost:5000/cart/${userId}/${product.id}`, { quantity: existsInCart.data.quantity + 1 });
      } else {
        await axios.post(`http://localhost:5000/cart/${userId}`, { ...product, quantity: 1 });
      }

      set((state) => {
        const wishlist = state.wishlist.filter((item) => item.id !== product.id);
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
useStore.getState().initializeWishlist();
export default useStore;
