import { ArrowLeft, Heart, Trash2, ShoppingCart } from 'lucide-react';

export default function WishlistPage({ wishlist, removeFromWishlist, navigateTo }) {
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center py-24">
          <Heart className="w-24 h-24 text-slate-300 mb-6" />
          <h2 className="text-[#0A1A3F] mb-3">Your wishlist is empty</h2>
          <p className="text-slate-600 mb-8">Save items you like for later</p>
          <button
            onClick={() => navigateTo('catalog')}
            className="bg-[#FF7A00] hover:bg-[#ff8a1a] text-white px-8 py-4 rounded-[20px] shadow-lg transition-all"
          >
            Browse Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back</span>
            </button>
            <h1 className="text-[#0A1A3F]">My Wishlist</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-slate-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-[20px] shadow-sm hover:shadow-lg transition-all overflow-hidden group">
              {/* Product Image */}
              <div 
                className="relative bg-slate-50 aspect-square p-6 cursor-pointer"
                onClick={() => navigateTo('detail', { product: item })}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <div className="text-xs text-slate-500 uppercase mb-1 capitalize">
                    {item.category}
                  </div>
                  <h3 className="text-[#0A1A3F] mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-slate-600">{item.manufacturer}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl text-[#FF7A00]">Rp {item.price.toLocaleString()}</div>
                  {item.inStock ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                  )}
                </div>

                <button
                  onClick={() => navigateTo('detail', { product: item })}
                  className="w-full bg-[#0A1A3F] hover:bg-[#0d2154] text-white px-4 py-3 rounded-[12px] flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-2 text-[#FF7A00] hover:text-[#ff8a1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
