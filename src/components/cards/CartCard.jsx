import { Trash2 } from "lucide-react";

export default function CartCard({ part, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-sm border gap-4">
      <img src={part.image} className="w-20 h-20 rounded-lg object-cover" />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">{part.name}</h3>
        <p className="text-blue-600 font-medium text-sm">Rp {part.price.toLocaleString()}</p>

        {/* Quantity control */}
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onDecrease(part.id)} className="px-3 py-1 bg-slate-200 rounded-lg">-</button>
          <span className="font-semibold">{part.qty}</span>
          <button onClick={() => onIncrease(part.id)} className="px-3 py-1 bg-slate-200 rounded-lg">+</button>
        </div>
      </div>

      <button onClick={() => onRemove(part.id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
