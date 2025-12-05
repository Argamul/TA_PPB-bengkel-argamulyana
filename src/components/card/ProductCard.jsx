import { useNavigate } from "react-router-dom";
import useToggleWishlist from "../../hooks/useToggleWishlist";
import WishlistButton from "../button/WishlistButton";
import useCart from "../../hooks/useCart";
import { FaCartPlus } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const { isWishlisted, toggleWishlist } = useToggleWishlist(product);
  const { addToCart } = useCart();

  const goDetail = () => navigate(`/catalog/${product.id}`);

  return (
    <article
      className="card product-card"
      onClick={goDetail}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {/* IMAGE WRAPPER */}
      <div className="card-img-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />

        {/* Wishlist — prevent redirect */}
        <div
          className="wishlist-float"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
        >
          <WishlistButton isActive={isWishlisted} />
        </div>
      </div>

      {/* BODY */}
      <div className="card-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-subtext">{product.engine_type}</p>

        <p className="product-price">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        {/* ADD TO CART */}
        <button
          className="btn-cart-mini"
          onClick={(e) => {
            e.stopPropagation(); // cegah buka detail
            addToCart(product);
          }}
        >
          <FaCartPlus size={16} /> Tambah
        </button>
      </div>
    </article>
  );
}
