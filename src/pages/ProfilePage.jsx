import { useNavigate } from "react-router-dom";

import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuBox,
  LuHeart,
  LuShoppingBag,
  LuPackage,
  LuSettings,
  LuLogOut
} from "react-icons/lu";

export default function ProfilePage() {
  const navigate = useNavigate();

  // Ambil dari localStorage
  const saved = JSON.parse(localStorage.getItem("user_profile")) || {};

  // Default jika kosong
  const user = {
    name: saved.name || "Guest User",
    email: saved.email || "guest@bengkel.com",
    avatar:
      saved.avatar ||
      "https://images.unsplash.com/photo-1603415526960-f7e0328f35f1?auto=format&fit=crop&w=800&q=80",
    phone: saved.phone || "-",
    address: saved.address || "-",
    member: saved.member || "2024",
    stats: saved.stats || { orders: 0, wishlist: 0, cart: 0 },
  };

  // ================================
  // HANDLERS
  // ================================
  const goEditProfile = () => navigate("/profile/edit");
  const goOrders = () => navigate("/orders");
  const goCart = () => navigate("/cart");
  const goWishlist = () => navigate("/wishlist");
  const goSettings = () => navigate("/settings");

  const handleLogout = () => {
    localStorage.removeItem("user_profile");
    navigate("/login", { replace: true });
  };

  return (
    <div className="page">
      <main className="page-content">
        <div className="profile-wrapper">

          {/* PROFILE CARD */}
          <div className="profile-card">
            <div className="profile-header-modern">
              
              {/* AVATAR */}
              <img
                src={user.avatar}
                alt="avatar"
                className="profile-avatar-modern"
              />

              <div>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-member">Member since {user.member}</p>
              </div>

              <button className="edit-profile-btn" onClick={goEditProfile}>
                ✎ Edit Profile
              </button>
            </div>

            {/* STATS */}
            <div className="stats-row">
              <div className="stats-card" onClick={goOrders}>
                <LuBox className="stats-icon icon-blue" />
                <h3>{user.stats.orders}</h3>
                <p>Orders</p>
              </div>

              <div className="stats-card" onClick={goWishlist}>
                <LuHeart className="stats-icon icon-pink" />
                <h3>{user.stats.wishlist}</h3>
                <p>Wishlist</p>
              </div>

              <div className="stats-card" onClick={goCart}>
                <LuShoppingBag className="stats-icon icon-orange" />
                <h3>{user.stats.cart}</h3>
                <p>Cart</p>
              </div>
            </div>

            {/* CONTACT */}
            <h3 className="contact-title">Contact Information</h3>

            <div className="contact-card">
              <LuMail className="contact-icon email" />
              <div>
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="contact-card">
              <LuPhone className="contact-icon phone" />
              <div>
                <label>Phone Number</label>
                <p>{user.phone}</p>
              </div>
            </div>

            <div className="contact-card">
              <LuMapPin className="contact-icon location" />
              <div>
                <label>Address</label>
                <p>{user.address}</p>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="quick-card">
            <h3 className="quick-title">Quick Actions</h3>

            <div className="quick-item" onClick={goOrders}>
              <div className="quick-left">
                <LuPackage className="quick-icon icon-orange" />
                <span>My Orders</span>
              </div>
              <span className="quick-arrow">→</span>
            </div>

            <div className="quick-item" onClick={goCart}>
              <div className="quick-left">
                <LuShoppingBag className="quick-icon icon-blue" />
                <span>View Cart</span>
              </div>
              <span className="quick-arrow">→</span>
            </div>

            <div className="quick-item" onClick={goWishlist}>
              <div className="quick-left">
                <LuHeart className="quick-icon icon-pink" />
                <span>View Wishlist</span>
              </div>
              <span className="quick-arrow">→</span>
            </div>

            <div className="quick-item" onClick={goSettings}>
              <div className="quick-left">
                <LuSettings className="quick-icon icon-purple" />
                <span>Settings</span>
              </div>
              <span className="quick-arrow">→</span>
            </div>
          </div>

          {/* LOGOUT */}
          <div className="logout-card">
            <button className="logout-btn-modern" onClick={handleLogout}>
              <LuLogOut />
              Logout
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
