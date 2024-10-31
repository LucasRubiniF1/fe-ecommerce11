import React from 'react';
import useStore from '../hooks/store.js';

const Wishlist = () => {
  const { wishlist, moveFromWishlistToCart } = useStore();

  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-4">
            <h2>{item.name}</h2>
            <button
              onClick={() => moveFromWishlistToCart(item)}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Move to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
