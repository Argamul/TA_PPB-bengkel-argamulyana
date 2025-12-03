import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/home", label: "Beranda" },
  { to: "/catalog", label: "Katalog" },
  { to: "/cart", label: "Keranjang" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/profile", label: "Profil" },
];

export default function DesktopNavbar() {
  return (
    <header className="navbar desktop-navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">
          Bengkel <span>GAMUL</span>
        </Link>
      </div>
      <nav className="navbar-menu">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
