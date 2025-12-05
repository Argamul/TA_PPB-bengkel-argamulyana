// src/components/navbar/DesktopNavbar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

export default function DesktopNavbar() {
  const { pathname } = useLocation();

  const menu = [
    { to: "/home", icon: <Home />, id: "home" },
    { to: "/catalog", icon: <Search />, id: "catalog" },
    { to: "/cart", icon: <ShoppingCart />, id: "cart" },
    { to: "/wishlist", icon: <Heart />, id: "wishlist" },
    { to: "/profile", icon: <User />, id: "profile" },
  ];

  return (
    <nav className="desktop-header">
      <div className="desktop-header-inner">
        {/* LOGO */}
        <Link to="/home" className="header-logo">
          <div className="logo-icon-box">
            <Home size={20} />
          </div>
          Bengkel SparePart
        </Link>

        {/* RIGHT MENU ICONS */}
        <div className="header-menu">
          {menu.map((m) => {
            const active = pathname.startsWith(m.to);
            return (
              <Link
                key={m.id}
                to={m.to}
                className={`header-icon ${active ? "active" : ""}`}
              >
                {m.icon}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
