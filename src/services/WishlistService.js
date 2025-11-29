// src/services/wishlistService.js

const STORAGE_KEY = "wishlist-items";

// Ambil data wishlist dari localStorage
export const getWishlist = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Check apakah item sudah masuk wishlist
export const isWishlisted = (id) => {
  const items = getWishlist();
  return items.some((item) => item.id === id);
};

// Toggle wishlist (add/remove)
export const toggleWishlist = (item) => {
  const items = getWishlist();
  const exists = items.some((i) => i.id === item.id);

  let newWishlist;
  if (exists) {
    newWishlist = items.filter((i) => i.id !== item.id);
  } else {
    newWishlist = [...items, item];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newWishlist));
  return !exists; // return wishlist status
};
