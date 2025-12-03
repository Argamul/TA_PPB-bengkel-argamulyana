import { useState, useEffect } from "react";

export default function useToggleWishlist(product) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(stored.some((item) => item.id === product.id));
  }, [product.id]);

  const toggleWishlist = () => {
    let stored = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      // REMOVE
      stored = stored.filter((item) => item.id !== product.id);
      setIsWishlisted(false);
    } else {
      // ADD
      stored.push(product);
      setIsWishlisted(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(stored));
  };

  return { isWishlisted, toggleWishlist };
}
