import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";
import EmptyState from "../components/EmptyState";
import useCart from "../hooks/useCart";

// Icons
import { LuShoppingBag } from "react-icons/lu";

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="page">

      <main className="page-content">

        {/* ======================= */}
        {/* EMPTY STATE */}
        {/* ======================= */}
        {cart.length === 0 ? (
          <EmptyState
            icon={<LuShoppingBag size={90} />}
            title="Your cart is empty"
            subtitle="Add some parts to get started"
            buttonText="Browse Catalog"
            buttonLink="/catalog"
          />
        ) : (
          <>
            <h1>Keranjang</h1>

            {/* ======================= */}
            {/* CART LIST */}
            {/* ======================= */}
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt="" className="cart-img" />

                  <div className="cart-info">
                    <h3>{item.manufacturer}</h3>
                    <p>{item.engine_type}</p>

                    <p className="price">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>

                    {/* QTY CONTROL */}
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="btn small outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* ======================= */}
            {/* SUMMARY */}
            {/* ======================= */}
            <div className="cart-summary">
              <p>
                Total:{" "}
                <strong>
                  Rp {Number(total).toLocaleString("id-ID")}
                </strong>
              </p>

              <button
                className="btn primary"
                onClick={() => {
                  alert("Checkout berhasil! (Simulasi)");
                  clearCart();
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
