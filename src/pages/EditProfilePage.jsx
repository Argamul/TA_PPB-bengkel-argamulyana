import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile") || "{}");
    setForm({
      username: saved.username || "",
      email: saved.email || "",
      phone: saved.phone || "",
      address: saved.address || "",
      avatar: saved.avatar || "/default-avatar.png",
    });
  }, []);

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    localStorage.setItem("profile", JSON.stringify(form));
    navigate("/profile");
  }

  return (
    <div className="page page-content">
      <h1>Edit Profile</h1>

      <div className="form">
        <label>
          Foto Profil
          <img src={form.avatar} className="edit-avatar" alt="avatar" />
          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
        </label>

        <label>
          Username
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label>
          Phone Number
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>

        <label>
          Address
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </label>

        <button className="btn primary" onClick={saveProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
