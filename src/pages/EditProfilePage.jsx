// pages/EditProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("user_profile"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "" // base64 image
  });

  useEffect(() => {
    if (saved) setForm(saved);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // HANDLE FILE UPLOAD
  function handleAvatarUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("user_profile", JSON.stringify(form));

    alert("Profile updated!");
    navigate("/profile");
  }

  return (
    <div className="page">
      <main className="page-content">

        <div className="edit-profile-wrapper">
          <h1 className="edit-title">Edit Profile</h1>

          <div className="edit-card">

            {/* Avatar preview */}
            <div className="avatar-preview">
              <img
                src={form.avatar || "https://via.placeholder.com/120?text=Avatar"}
                alt="avatar"
              />
            </div>

            {/* Upload button */}
            <label className="upload-btn">
              Upload New Avatar
              <input type="file" accept="image/*" onChange={handleAvatarUpload} />
            </label>

            {/* FORM */}
            <form className="edit-form" onSubmit={handleSubmit}>

              <label className="edit-label">Full Name</label>
              <input
                name="name"
                className="edit-input"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label className="edit-label">Email</label>
              <input
                name="email"
                className="edit-input"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label className="edit-label">Phone Number</label>
              <input
                name="phone"
                className="edit-input"
                value={form.phone}
                onChange={handleChange}
              />

              <label className="edit-label">Address</label>
              <input
                name="address"
                className="edit-input"
                value={form.address}
                onChange={handleChange}
              />

              <button className="save-profile-btn" type="submit">
                Save Changes
              </button>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}
