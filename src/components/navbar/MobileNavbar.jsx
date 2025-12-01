import { Home, Wrench, ShoppingCart, Heart, User } from "lucide-react";

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navBtn = (page, icon) => (
    <button
      onClick={() => onNavigate(page)}
      className={`flex flex-col items-center gap-1 p-2 transition-all
        ${currentPage === page ? "text-blue-600" : "text-slate-600 hover:text-blue-500"}`}
    >
      {icon}
    </button>
  );

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg py-2 z-50">
      <div className="flex justify-around items-center">
        {navBtn("home", <Home size={24} />)}
        {navBtn("catalog", <Wrench size={24} />)}
        {navBtn("order", <ShoppingCart size={24} />)}
        {navBtn("wishlist", <Heart size={24} />)}
        {navBtn("profile", <User size={24} />)}
      </div>
    </nav>
  );
}
