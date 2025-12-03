import { useEffect, useState } from "react";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";
import ProductCard from "../components/card/ProductCard";
import EmptyState from "../components/EmptyState";

// Icons
import { LuHeart } from "react-icons/lu";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setItems(stored);
  }, []);

  return (
    <div className="page">
      <DesktopNavbar />
      <MobileNavbar />

      <main className="page-content">

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <EmptyState
            icon={<LuHeart size={90} />}
            title="Your wishlist is empty"
            subtitle="Add your favorite parts to save them here"
            buttonText="Browse Catalog"
            buttonLink="/catalog"
          />
        ) : (
          <>
            <h1>Wishlist</h1>

            <div className="grid-products">
              {items.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
