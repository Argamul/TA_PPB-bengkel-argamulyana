// src/components/cards/PartsCard.jsx
export default function PartsCard({ part, onNavigate }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer">
      <img
        src={part.image_url}
        alt={part.part_name}
        className="w-full h-36 object-cover rounded-lg"
        onClick={() => onNavigate("detail", part.id)}
      />

      <h3 className="mt-3 font-semibold text-slate-800 text-lg">
        {part.part_name}
      </h3>
      <p className="text-sm text-slate-600">
        {part.manufacturer}
      </p>

      <p className="text-blue-600 font-bold mt-2">
        Rp {part.price?.toLocaleString("id-ID")}
      </p>

      <button
        className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
