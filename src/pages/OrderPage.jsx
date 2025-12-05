// pages/OrderPage.jsx
import { useState } from "react";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";

export default function OrderPage() {
  
  const formatRupiah = (value) =>
  value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  });
  
  const orders = [
  {
    id: "ORD-2024-001",
    date: "28 November 2024",
    total: 3_248_500, // Rp 3.248.500
    status: "Delivered",
    tracking: "TRK-998577665544",
    address: "Jl. Bengkel Utama No. 12, Jakarta",
    items: [
      {
        name: "Premium Turbocharger Assembly",
        brand: "Toyota",
        qty: 2,
        price: 1_299_000, // Rp 1.299.000
        img: "https://via.placeholder.com/80"
      },
      {
        name: "Advanced Brake System Kit",
        brand: "Honda",
        qty: 1,
        price: 449_000, // Rp 449.000
        img: "https://via.placeholder.com/80"
      }
    ]
  },

  {
    id: "ORD-2024-002",
    date: "30 November 2024",
    total: 5_499_000, // Rp 5.499.000
    status: "Processing",
    tracking: "TRK-112233445566",
    address: "Jl. Bengkel Utama No. 12, Jakarta",
    items: [
      {
        name: "Heavy-Duty Transmission",
        brand: "Mercedes-Benz",
        qty: 1,
        price: 5_499_000, // Rp 5.499.000
        img: "https://via.placeholder.com/80"
      }
    ]
  },

  {
    id: "ORD-2024-003",
    date: "1 Desember 2024",
    total: 2_899_000, // Rp 2.899.000
    status: "Shipped",
    tracking: "TRK-335455667788",
    address: "Jl. Bengkel Utama No. 12, Jakarta",
    items: [
      {
        name: "V8 Engine Rebuild Kit",
        brand: "Ford",
        qty: 1,
        price: 2_899_000, // Rp 2.899.000
        img: "https://via.placeholder.com/80"
      }
    ]
  }
];

  // ===============================
  // Filter
  // ===============================
  const [filter, setFilter] = useState("All");

  const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="page">

      <main className="page-content">

        <h1 className="order-title">My Orders</h1>

        {/* FILTER TABS */}
        <div className="order-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`order-tab ${filter === t ? "active" : ""}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ORDER LIST */}
        <div className="order-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">

              {/* TOP ROW */}
              <div className="order-header">

                <div>
                  <h3>Order {order.id}</h3>
                  <p className="order-date">Placed on {order.date}</p>
                  <p className="order-total">IDR.{order.total.toLocaleString()}</p>
                </div>

                <div className="order-right">
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>

                  <p className="order-tracking">{order.tracking}</p>
                </div>

              </div>

              {/* ITEMS */}
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item" key={i}>
                    <img src={item.img} className="item-img" />

                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.brand}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                      <p className="item-price">IDR.{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* SHIPPING */}
              <div className="order-address">
                <p className="label">Shipping Address</p>
                <p>{order.address}</p>
              </div>

              {/* BUTTONS */}
              <div className="order-buttons">
                {order.status === "Processing" && (
                  <button className="order-track-btn">Track Order</button>
                )}

                {order.status === "Shipped" && (
                  <button className="order-track-btn">Track Order</button>
                )}

                {order.status === "Delivered" && (
                  <button className="order-reorder-btn">Reorder</button>
                )}

                <button className="order-details-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
