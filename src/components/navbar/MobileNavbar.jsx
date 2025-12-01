import { Home, ShoppingCart, Package, User } from "lucide-react";

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home", icon: <Home size={22} /> },
    { id: "catalog", label: "Catalog", icon: <ShoppingCart size={22} /> },
    { id: "orders", label: "Orders", icon: <Package size={22} /> },
    { id: "profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center text-xs font-medium transition ${
              currentPage === item.id ? "text-blue-600" : "text-slate-600"
            }`}
          >
            <div className="mb-1">{item.icon}</div>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
