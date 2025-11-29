import { X, ShoppingCart } from "lucide-react";

export default function WishlistCard({ part, onRemove, onAddToCart }) {
  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border gap-4">
      <img src={part.image} className="w-20 h-20 rounded-lg object-cover" />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">{part.name}</h3>
        <p className="text-blue-600 font-medium text-sm">Rp {part.price.toLocaleString()}</p>
      </div>

      <button onClick={() => onAddToCart(part)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <ShoppingCart className="w-5 h-5" />
      </button>

      <button onClick={() => onRemove(part.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
