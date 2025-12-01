import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from '@motionone/react';
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft, Star, Package, Settings } from 'lucide-react';
import { products } from '../utils/data';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import ProductCard from '../components/ProductCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useApp } from '../utils/context';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[#1E3A8A] font-['Inter'] text-2xl mb-4">Product not found</h2>
          <Link to="/catalog">
            <SecondaryButton>Back to Catalog</SecondaryButton>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrls = {
    'auto parts engine': 'https://images.unsplash.com/photo-1762139258224-236877b2c571?w=800',
    'car brake disk': 'https://images.unsplash.com/photo-1641661217140-7d699cd2d324?w=800',
    'car headlight led': 'https://images.unsplash.com/photo-1611025658784-3ae879be85a4?w=800',
    'suspension system': 'https://images.unsplash.com/photo-1760317890283-540a468b86f6?w=800',
    'train wheels metal': 'https://images.unsplash.com/photo-1679973568520-4283910abf6c?w=800',
    'aircraft engine turbine': 'https://images.unsplash.com/photo-1606336783080-15e2bacd9cd2?w=800',
    'car oil filter': 'https://images.unsplash.com/photo-1657644049321-4c3aa2e8aba7?w=800',
    'transmission gears': 'https://images.unsplash.com/photo-1570224282208-8319d7252a99?w=800',
    'car alternator': 'https://images.unsplash.com/photo-1663642775693-6628f65358be?w=800',
  };

  const inWishlist = isInWishlist(product.id);
  const recommendedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} added to cart!`);
    navigate('/cart');
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/catalog">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#F97316] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-['Inter']">Back to Catalog</span>
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[20px] overflow-hidden shadow-lg"
          >
            <div className="aspect-square">
              <ImageWithFallback
                src={imageUrls[product.image] || imageUrls['auto parts engine']}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 rounded-[12px] bg-[#1E40AF] text-white text-sm font-['Inter']">
              {product.category}
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-[#1E3A8A] font-['Inter'] text-3xl md:text-4xl mb-2">
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#F97316] text-[#F97316]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Manufacturer & Engine */}
            <div className="bg-white rounded-[20px] p-6 shadow-md space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-[12px]">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Manufacturer</p>
                  <p className="text-[#1E3A8A] font-['Inter']">{product.manufacturer}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-[12px]">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engine Type</p>
                  <p className="text-[#1E3A8A] font-['Inter']">{product.engineType}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[20px] p-6 shadow-md">
              <h3 className="text-[#1E3A8A] font-['Inter'] mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Price & Actions */}
            <div className="bg-white rounded-[20px] p-6 shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-[#1E3A8A] font-['Inter'] text-3xl">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Stock</p>
                  <p className={`font-['Inter'] text-lg ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                    {product.stock} units
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-[12px] bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-5 h-5 text-[#1E3A8A]" />
                  </button>
                  <span className="text-[#1E3A8A] font-['Inter'] text-xl w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 rounded-[12px] bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 text-[#1E3A8A]" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <PrimaryButton
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </PrimaryButton>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 rounded-[20px] border-2 transition-all ${
                    inWishlist
                      ? 'bg-[#F97316] border-[#F97316]'
                      : 'bg-white border-gray-300 hover:border-[#F97316]'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      inWishlist ? 'fill-white text-white' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-[#1E3A8A] font-['Inter'] text-2xl mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((recProduct) => (
                <ProductCard key={recProduct.id} product={recProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
