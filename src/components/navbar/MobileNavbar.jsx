// src/components/navbar/MobileNavbar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

export default function MobileNavbar() {
  const { pathname } = useLocation();

  const items = [
    { to: "/home", label: "Home", icon: <Home /> },
    { to: "/catalog", label: "Catalog", icon: <Search /> },
    { to: "/cart", label: "Cart", icon: <ShoppingCart /> },
    { to: "/wishlist", label: "Wishlist", icon: <Heart /> },
    { to: "/profile", label: "Profile", icon: <User /> },
  ];

  return (
    <nav className="mobile-nav">
      {items.map((item) => {
        const active = pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`mobile-nav-item ${active ? "active" : ""}`}
          >
            <div className="mobile-nav-icon">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
