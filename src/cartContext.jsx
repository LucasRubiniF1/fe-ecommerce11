import { createContext, useContext, useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart_items';
const WISHLIST_STORAGE_KEY = 'wishlist_items';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.product_id === product.product_id);
      if (existingItem) {
        // Si el producto ya está en el carrito, no hacemos nada
        return currentCart;
      }
      // Si el producto no está en el carrito, lo agregamos con cantidad 1
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.product_id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart(currentCart => {
      if (quantity <= 0) {
        return currentCart.filter(item => item.product_id !== productId);
      }

      return currentCart.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(currentWishlist => {
      const exists = currentWishlist.some(item => item.product_id === product.product_id);
      
      if (exists) {
        return currentWishlist.filter(item => item.product_id !== product.product_id);
      }
      
      return [...currentWishlist, product];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.product_id === productId);
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInWishlist,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}