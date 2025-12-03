export default function WishlistButton({ isActive, onToggle }) {
  return (
    <button
      className={"wishlist-btn " + (isActive ? "active" : "")}
      onClick={onToggle}
    >
      {isActive ? "❤️" : "🤍"}
    </button>
  );
}
