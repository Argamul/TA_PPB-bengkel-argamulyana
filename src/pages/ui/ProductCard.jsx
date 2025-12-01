export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-[12px] shadow-md hover:shadow-lg transition-all overflow-hidden">
      <div className="bg-gray-100 aspect-square flex items-center justify-center p-4">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 truncate mb-3">{product.manufacturer}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#FF7A00]">
            Rp {product.price?.toLocaleString() || '0'}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Stock: {product.stock || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
