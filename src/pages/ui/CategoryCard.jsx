export default function CategoryCard({ category, onClick }) {
  const categoryColors = {
    'Mobil': '#3B82F6',
    'Bus': '#10B981',
    'Kereta': '#F59E0B',
    'Pesawat': '#8B5CF6',
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-[12px] shadow-md hover:shadow-lg transition-all p-6 text-center"
      style={{ borderTop: `4px solid ${categoryColors[category] || '#6B7280'}` }}
    >
      <h3 className="font-semibold text-gray-800 text-lg">{category}</h3>
      <p className="text-sm text-gray-600 mt-2">Browse {category} parts</p>
    </button>
  );
}
