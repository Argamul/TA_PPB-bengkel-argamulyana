import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Package, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DetailPage({ product, navigateTo, addToCart, addToWishlist }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Product not found</p>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigateTo('catalog')}
            className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Catalog</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Viewer */}
          <div>
            <div className="bg-white rounded-[20px] shadow-lg p-8 mb-4 relative overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#0A1A3F]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-[#0A1A3F]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-[12px] overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-[#FF7A00] shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-[20px] shadow-lg p-8">
              {/* Category Badge */}
              <div className="inline-block px-4 py-1 bg-[#0A1A3F]/10 text-[#0A1A3F] rounded-full text-sm mb-4 capitalize">
                {product.category}
              </div>

              <h1 className="text-[#0A1A3F] mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#FF7A00] text-[#FF7A00]'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl text-[#FF7A00] mb-2">
                  ${product.price.toLocaleString()}
                </div>
                {product.oldPrice && (
                  <div className="text-slate-400 line-through">
                    ${product.oldPrice.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-6 bg-slate-50 rounded-[20px]">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Manufacturer</p>
                  <p className="text-[#0A1A3F]">{product.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Engine Type</p>
                  <p className="text-[#0A1A3F]">{product.engineType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Part Number</p>
                  <p className="text-[#0A1A3F]">{product.partNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Stock Status</p>
                  <p className="text-green-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-[#0A1A3F] mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] shadow-lg transition-all ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-[#FF7A00] hover:bg-[#ff8a1a] text-white'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`px-6 py-4 rounded-[20px] border-2 transition-all ${
                    addedToWishlist
                      ? 'bg-pink-50 border-pink-500 text-pink-500'
                      : 'border-[#0A1A3F] text-[#0A1A3F] hover:bg-[#0A1A3F] hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${addedToWishlist ? 'fill-pink-500' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="bg-green-100 p-2 rounded-[12px]">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="bg-blue-100 p-2 rounded-[12px]">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Easy returns within 30 days</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="bg-purple-100 p-2 rounded-[12px]">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>1 year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
