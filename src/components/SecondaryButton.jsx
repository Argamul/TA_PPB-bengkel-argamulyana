export default function SecondaryButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-all font-medium ${className}`}
    >
      {children}
    </button>
  );
}
