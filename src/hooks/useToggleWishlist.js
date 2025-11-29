// src/hooks/useWishlist.js
import { useState, useEffect } from "react";
import { toggleWishlist, isWishlisted } from "../services/wishlistService";

/**
 * Custom hook untuk mengelola wishlist
 * digunakan untuk sparepart atau kendaraan
 */
export const useWishlist = (item) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cek status awal pada localStorage
  useEffect(() => {
    if (item?.id) {
      setWishlisted(isWishlisted(item.id));
    }
  }, [item?.id]);

  const toggle = async () => {
    if (!item) return;

    setLoading(true);
    const result = toggleWishlist(item);
    setWishlisted(result);

    // Trigger event untuk sinkronisasi jika dibuka di halaman lain
    window.dispatchEvent(new Event("storage"));

    setLoading(false);
    return result;
  };

  return { wishlisted, toggle, loading };
};
