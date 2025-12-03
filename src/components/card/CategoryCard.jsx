import { Link } from "react-router-dom";

export default function CategoryCard({ icon, title, category }) {
  return (
    <Link to={`/catalog?category=${category}`} className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{title}</h3>
      <p className="category-view">Lihat produk →</p>
    </Link>
  );
}
