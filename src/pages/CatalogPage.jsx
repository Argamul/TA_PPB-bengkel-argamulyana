import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, ArrowLeft } from 'lucide-react';
import ProductCard from './ui/ProductCard';
import { allProducts } from '../data/products';

export default function CatalogPage({ navigateTo, selectedCategory, addToCart, addToWishlist }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(selectedCategory || 'all');
  const [manufacturer, setManufacturer] = useState('');
  const [engineType, setEngineType] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'car', 'bus', 'train', 'aircraft'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const filteredProducts = allProducts
    .filter(p => category === 'all' || p.category === category)
    .filter(p => !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(p => !manufacturer || p.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()))
    .filter(p => !engineType || p.engineType.toLowerCase().includes(engineType.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigateTo('home')}
              className="text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[#0A1A3F]">Parts Catalog</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts, manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter Toggle & Category Pills */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all text-[#0A1A3F]"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>

          <div className="flex gap-2 flex-wrap flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-[20px] capitalize transition-all ${
                  category === cat
                    ? 'bg-[#FF7A00] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-[20px] shadow-sm p-6 mb-6 grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Manufacturer</label>
              <input
                type="text"
                placeholder="e.g., Toyota, Boeing..."
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Engine Type</label>
              <input
                type="text"
                placeholder="e.g., V8, Diesel..."
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] outline-none appearance-none transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigateTo('detail', { product })}
                onAddToCart={() => addToCart(product)}
                onAddToWishlist={() => addToWishlist(product)}
                showActions
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}