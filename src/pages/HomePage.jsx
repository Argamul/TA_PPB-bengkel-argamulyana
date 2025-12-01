import { Car, Bus, Train, Plane, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import CategoryCard from './ui/CategoryCard';
import ProductCard from './ui/ProductCard';
import { featuredProducts } from '../data/products';

export default function HomePage({ navigateTo }) {
  const categories = [
    { id: 'car', name: 'Car', icon: Car, color: 'from-blue-500 to-blue-600' },
    { id: 'bus', name: 'Bus', icon: Bus, color: 'from-green-500 to-green-600' },
    { id: 'train', name: 'Train', icon: Train, color: 'from-purple-500 to-purple-600' },
    { id: 'aircraft', name: 'Aircraft', icon: Plane, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#0A1A3F] rounded-[20px] p-2.5">
                <Sparkles className="w-6 h-6 text-[#FF7A00]" />
              </div>
              <div>
                <h1 className="text-[#0A1A3F]">Bengkel SparePart</h1>
                <p className="text-slate-500 text-sm">Digital Marketplace</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('about')}
              className="text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              About
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0A1A3F] via-[#0d2154] to-[#0A1A3F] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-sm">Trusted by 10,000+ mechanics worldwide</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl mb-6">
              Find the Perfect Parts for Any Vehicle
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Your one-stop marketplace for quality spare parts across cars, buses, trains, and aircraft. Fast delivery, competitive prices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('catalog')}
                className="bg-[#FF7A00] hover:bg-[#ff8a1a] text-white px-8 py-4 rounded-[20px] shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Browse Catalog
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateTo('addpart')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-[20px] border border-white/20 transition-all"
              >
                Sell Parts (Admin)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-[#0A1A3F] mb-3">Shop by Vehicle Type</h3>
          <p className="text-slate-600">Select your vehicle category to find compatible parts</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => navigateTo('catalog', { category: category.id })}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-[#0A1A3F] mb-2">Featured Parts</h3>
            <p className="text-slate-600">Popular picks from our catalog</p>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-[#FF7A00] hover:text-[#ff8a1a] flex items-center gap-2 transition-colors"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigateTo('detail', { product })}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Products', value: '50,000+' },
              { label: 'Happy Customers', value: '10,000+' },
              { label: 'Countries', value: '25+' },
              { label: 'Years Experience', value: '15+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl text-[#FF7A00] mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}