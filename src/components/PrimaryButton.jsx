export default function PrimaryButton({ children, onClick, disabled, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#FF7A00] hover:bg-[#ff8a1a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all font-medium ${className}`}
    >
      {children}
    </button>
  );
}
