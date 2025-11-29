import { ShoppingCart } from "lucide-react";

export default function PartCard({ part, onNavigate }) {
  return (
    <div
      onClick={() => onNavigate("detail", part.id)}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer p-3 border"
    >
      <img src={part.image} alt={part.name} className="w-full h-28 object-cover rounded-xl mb-2" />
      <h3 className="font-semibold text-slate-800 leading-tight">{part.name}</h3>
      <p className="text-blue-600 font-semibold text-sm">Rp {part.price.toLocaleString()}</p>
    </div>
  );
}
