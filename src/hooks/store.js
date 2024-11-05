import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      addToCart: (product, userId) => set((state) => {
        // Verifica si el producto tiene stock
        if (product.stock <= 0) {
            // Si no hay stock, no se añade al carrito
            return state; // O puedes lanzar un error, dependiendo de tu manejo de errores
        }
    
        const exists = state.cart.find(item => item.id === product.id);
        if (exists) {
            // Si el producto ya existe en el carrito, aumenta la cantidad
            return {
                cart: state.cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        // Si el producto no existe en el carrito, lo añade con cantidad 1
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
    
    updateQuantity: (itemId, newQuantity) => {
        set((state) => {
            // Si la nueva cantidad es cero, eliminamos el producto del carrito
            if (newQuantity <= 0) {
                return {
                    cart: state.cart.filter(item => item.id !== itemId),
                };
            }
            
            // De lo contrario, actualizamos la cantidad del producto
            return {
                cart: state.cart.map((item) =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                ),
            };
        });
    },

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      addToWishlist: (product, userId) =>
        set((state) => {
          const isAlreadyInWishlist = state.wishlist.find((item) => item.id === product.id);
          if (isAlreadyInWishlist) return state;
          return { wishlist: [...state.wishlist, product] };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      moveFromWishlistToCart: (product) =>
        set((state) => {
          const wishlist = state.wishlist.filter((item) => item.id !== product.id);
          const existsInCart = state.cart.find((item) => item.id === product.id);
          const cart = existsInCart
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...state.cart, { ...product, quantity: 1 }];
          return { wishlist, cart };
        }),
    }),
    {
      name: 'shop-storage',
      version: 1, // helps with migrations if you change the store structure
      partialize: (state) => ({ 
        cart: state.cart,
        wishlist: state.wishlist 
      }), // only persist these fields
    }
  )
);

export default useStore;



