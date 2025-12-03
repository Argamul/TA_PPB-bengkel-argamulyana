import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "User",
    email: "email@example.com",
    phone: "-",
    address: "-",
    avatar: "/default-avatar.png",
  });

  const [stats, setStats] = useState({
    wishlist: 0,
    cart: 0,
    orders: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile") || "{}");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    setProfile({
      username: saved.username || "User",
      email: saved.email || "email@example.com",
      phone: saved.phone || "-",
      address: saved.address || "-",
      avatar: saved.avatar || "/default-avatar.png",
    });

    setStats({
      wishlist: wishlist.length,
      cart: cart.length,
      orders: 0, // dummy
    });
  }, []);

  return (
    <div className="page">
      <DesktopNavbar />
      <MobileNavbar />

      <main className="page-content">
        <div className="profile-card-container">
          <div className="profile-header">
            <img src={profile.avatar} alt="avatar" className="profile-avatar" />

            <div>
              <h2>{profile.username}</h2>
              <p>{profile.email}</p>
              <p className="profile-member">Member since January 2024</p>
            </div>

            <Link to="/profile/edit" className="btn small primary">
              Edit Profile
            </Link>
          </div>

          <div className="profile-stats">
            <div className="stat-box">
              <h3>{stats.orders}</h3>
              <p>Orders</p>
            </div>
            <div className="stat-box">
              <h3>{stats.wishlist}</h3>
              <p>Wishlist</p>
            </div>
            <div className="stat-box">
              <h3>{stats.cart}</h3>
              <p>Cart</p>
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <span>Email</span>
              <p>{profile.email}</p>
            </div>

            <div className="info-row">
              <span>Phone</span>
              <p>{profile.phone}</p>
            </div>

            <div className="info-row">
              <span>Address</span>
              <p>{profile.address}</p>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/orders" className="action-row">My Orders →</Link>
            <Link to="/cart" className="action-row">View Cart →</Link>
            <Link to="/wishlist" className="action-row">View Wishlist →</Link>
            <button className="action-row disabled">Settings (Coming Soon)</button>
          </div>

          <button
            className="logout-btn"
            onClick={() => alert("Logout dummy")}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
