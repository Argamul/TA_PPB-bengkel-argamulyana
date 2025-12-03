import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/home", label: "Beranda" },
  { to: "/catalog", label: "Katalog" },
  { to: "/cart", label: "Keranjang" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/profile", label: "Profil" },
];

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar mobile-navbar">
      <div className="navbar-inner">
        <Link to="/home" className="logo">
          BG
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <nav className="mobile-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "mobile-link" + (isActive ? " mobile-link-active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
