import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const UseStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      addToCart: (product) => set((state) => {
        const exists = state.cart.find(item => item.id === product.id);
        if (exists) {
          return {
            cart: state.cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      updateQuantity: (itemId, newQuantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        }));
      },

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      addToWishlist: (product) =>
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

export default UseStore;