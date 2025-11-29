// src/pages/OrderPage.jsx
import { useState, useEffect } from "react";
import { ArrowLeft, Loader, Trash2, CreditCard, MapPin } from "lucide-react";

export default function OrderPage({ onBack }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");

  // get cart items
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const handleOrder = () => {
    if (!address.trim()) {
      alert("Alamat tidak boleh kosong");
      return;
    }

    alert("Pesanan berhasil dibuat!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center gap-2">
        <button onClick={onBack} className="text-slate-700 hover:text-slate-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800">Konfirmasi Pesanan</h1>
      </div>

      <main className="max-w-3xl mx-auto p-4">
        {/* Cart List */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Daftar Produk</h2>

          {cartItems.length === 0 ? (
            <p className="text-slate-500 text-center">Keranjang kosong</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b last:border-b-0 pb-3 mb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="font-medium text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-600">
                      Qty: {item.qty} | Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
            <MapPin className="w-5 h-5" /> Alamat Pengiriman
          </h2>
          <textarea
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis alamat lengkap..."
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
            <CreditCard className="w-5 h-5" /> Metode Pembayaran
          </h2>

          <select
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Transfer Bank</option>
            <option>COD (Bayar di Tempat)</option>
            <option>E-Wallet (Dana, OVO, Gopay)</option>
          </select>
        </div>

        {/* Summary */}
        <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between text-lg font-semibold mb-2">
            <span>Total Pembayaran</span>
            <span>Rp {calculateTotal().toLocaleString()}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0}
            className="mt-4 w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buat Pesanan
          </button>
        </div>
      </main>
    </div>
  );
}
