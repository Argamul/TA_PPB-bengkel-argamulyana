import DesktopNavbar from "../components/navbar/DesktopNavbar.jsx";
import MobileNavbar from "../components/navbar/MobileNavbar.jsx";

export default function OrderPage() {
  // Untuk TA, bisa jelaskan ini sebagai placeholder histori pesanan
  const dummyOrders = [
    {
      id: "ORD-001",
      date: "2025-11-30",
      total: 850000,
      status: "Selesai",
    },
  ];

  return (
    <div className="page">
      <DesktopNavbar />
      <MobileNavbar />
      <main className="page-content">
        <h1>Riwayat Pesanan</h1>
        <ul className="order-list">
          {dummyOrders.map((o) => (
            <li key={o.id} className="order-item">
              <h3>{o.id}</h3>
              <p>Tanggal: {o.date}</p>
              <p>Total: Rp {o.total.toLocaleString("id-ID")}</p>
              <p>Status: {o.status}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
