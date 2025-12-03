import { Link } from "react-router-dom";
import useToggleWishlist from "../../hooks/useToggleWishlist";
import WishlistButton from "../button/WishlistButton";
import useCart from "../../hooks/useCart";
import { FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useToggleWishlist(product);
  const { addToCart } = useCart();

  return (
    <article className="card product-card">
      
      {/* IMAGE + Wishlist */}
      <div className="card-img-wrapper">
        <Link to={`/catalog/${product.id}`}>
          <img
            src={product.image}
            alt={product.manufacturer}
            className="card-img"
            onError={(e) => (e.target.src = "/fallback.jpg")}
          />
        </Link>

        <div className="wishlist-float">
          <WishlistButton
            isActive={isWishlisted}
            onToggle={toggleWishlist}
          />
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">
        <h3 className="product-title">{product.manufacturer}</h3>
        <p className="product-subtext">{product.engine_type}</p>

        <p className="product-price">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        {/* ADD TO CART */}
        <button
          className="btn-cart-mini"
          onClick={() => addToCart(product)}
        >
          <FaCartPlus size={16} /> Tambah
        </button>
      </div>
    </article>
  );
}
