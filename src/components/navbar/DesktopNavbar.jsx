import { ShoppingCart, Heart, User, Wrench, Home } from "lucide-react";

export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItem = (page, label, icon) => (
    <button
      onClick={() => onNavigate(page)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all
        ${currentPage === page ? "bg-blue-600 text-white shadow-md" : "text-slate-700 hover:bg-blue-100"}
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="hidden md:flex justify-between items-center px-8 py-4 bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <h1
        className="text-xl font-bold cursor-pointer text-blue-700"
        onClick={() => onNavigate("home")}
      >
        GAMUL WORKSHOP
      </h1>

      <div className="flex items-center gap-3">
        {navItem("home", "Home", <Home size={20} />)}
        {navItem("catalog", "Catalog", <Wrench size={20} />)}
        {navItem("order", "Order", <ShoppingCart size={20} />)}
        {navItem("wishlist", "Wishlist", <Heart size={20} />)}
        {navItem("profile", "Profile", <User size={20} />)}
      </div>
    </nav>
  );
}
