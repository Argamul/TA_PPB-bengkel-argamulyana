import { useState, useEffect } from "react";

const STORAGE_KEY = "cart_items";

export default function useCart() {
  const [cart, setCart] = useState([]);

  // LOAD AWAL
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  function save(updated) {
    setCart(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  // ADD PRODUCT
  function addToCart(product) {
    const exists = cart.some((item) => item.id === product.id);
    if (!exists) {
      save([...cart, { ...product, qty: 1 }]);
    }
  }

  // REMOVE PRODUCT
  function removeFromCart(id) {
    save(cart.filter((item) => item.id !== id));
  }

  // UPDATE JUMLAH
  function updateQty(id, newQty) {
    save(
      cart.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  }

  // CLEAR CART
  function clearCart() {
    save([]);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };
}
