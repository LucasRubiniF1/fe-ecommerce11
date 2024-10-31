import { create } from 'zustand';

const useStore = create((set) => ({
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

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),

  addToWishlist: (product) =>
    set((state) => ({
      wishlist: [...state.wishlist, product],
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
}));
export default useStore;
