import { Wrench, Search, ShoppingCart, User } from "lucide-react";

export default function DesktopNavbar({ cartCount = 0 }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* Placeholder Logo - nanti ganti dengan <img src={logoUrl} /> */}
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Bengkel Gamul
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari spare part atau jasa..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            <button className="relative hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
              <User className="w-6 h-6" />
              <span className="font-medium">Akun</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}