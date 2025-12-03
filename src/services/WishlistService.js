const KEY = "bengkel_gamul_wishlist";

export function getWishlist() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function toggleWishlist(id) {
  const current = getWishlist();
  const exists = current.includes(id);
  const next = exists
    ? current.filter((x) => x !== id)
    : [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function isWishlisted(id) {
  return getWishlist().includes(id);
}
