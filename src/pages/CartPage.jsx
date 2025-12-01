import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

export default function CartPage({ cart, updateQuantity, removeFromCart, navigateTo }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
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
          <ShoppingBag className="w-24 h-24 text-slate-300 mb-6" />
          <h2 className="text-[#0A1A3F] mb-3">Your cart is empty</h2>
          <p className="text-slate-600 mb-8">Add some parts to get started</p>
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
              onClick={() => navigateTo('catalog')}
              className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="text-[#0A1A3F]">Shopping Cart</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-[20px] shadow-sm p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-slate-50 rounded-[12px] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0A1A3F] mb-2 truncate">{item.name}</h3>
                    <p className="text-sm text-slate-600 mb-1">
                      {item.manufacturer} • {item.engineType}
                    </p>
                    <p className="text-[#FF7A00]">${item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 bg-slate-50 rounded-[12px] p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#0A1A3F]" />
                      </button>
                      <span className="w-8 text-center text-[#0A1A3F]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#0A1A3F]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[20px] shadow-lg p-6 sticky top-24">
              <h3 className="text-[#0A1A3F] mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {subtotal < 500 && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-[12px] p-3 text-sm text-blue-700">
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="border-t-2 border-slate-200 pt-4">
                  <div className="flex justify-between text-[#0A1A3F]">
                    <span>Total</span>
                    <span className="text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#FF7A00] hover:bg-[#ff8a1a] text-white px-6 py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 transition-all mb-4">
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigateTo('catalog')}
                className="w-full border-2 border-[#0A1A3F] text-[#0A1A3F] hover:bg-[#0A1A3F] hover:text-white px-6 py-4 rounded-[20px] transition-all"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t-2 border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Customer support 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
