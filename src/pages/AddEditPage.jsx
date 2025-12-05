import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getProductById,
  createProduct,
  updateProduct,
} from "../services/ProductService";

import { uploadImage } from "../services/uploadService";

export default function AddEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    engine_type: "",
    category: "Mobil",
    price: 0,
    part_number: "",
    stock_status: true,
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await getProductById(id);
        if (data) setForm(data);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (id) {
      await updateProduct(id, form);
      alert("Produk berhasil diperbarui!");
    } else {
      await createProduct(form);
      alert("Produk berhasil ditambahkan!");
    }

    navigate("/catalog");
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    setForm((prev) => ({ ...prev, image: url }));
  }

  return (
    <div className="page">
      <main className="page-content addedit-wrapper">

        {/* Admin Panel Notice */}
        <div className="admin-panel">
          <strong>Admin Panel:</strong> Fill in the product details below
        </div>

        <form onSubmit={handleSubmit} className="addedit-card">

          {/* ===== PRODUCT IMAGE ===== */}
          <label className="form-label">Product Image</label>
          <div className="upload-box" onClick={() => document.getElementById("imgInput").click()}>
            {form.image ? (
              <img src={form.image} alt="preview" className="upload-preview" />
            ) : (
              <div className="upload-placeholder">
                <p>📷 Click untuk mengunggah gambar</p>
                <small>PNG, JPG up to 10MB</small>
              </div>
            )}
          </div>

          <input
            type="file"
            id="imgInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />

          {/* ===== FORM FIELDS ===== */}
          <div className="form-grid">

            {/* PRODUCT NAME */}
            <div className="form-group full">
              <label className="form-label">Nama Produk *</label>
              <input
                type="text"
                placeholder="e.g., Turbocharger Assembly"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* MANUFACTURER */}
            <div className="form-group">
              <label className="form-label">Pembuat *</label>
              <input
                type="text"
                placeholder="e.g., Toyota, Boeing"
                value={form.manufacturer}
                onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                required
              />
            </div>

            {/* ENGINE TYPE */}
            <div className="form-group">
              <label className="form-label">Tipe Mesin *</label>
              <input
                type="text"
                placeholder="e.g., V8, Diesel, Jet"
                value={form.engine_type}
                onChange={(e) => setForm({ ...form, engine_type: e.target.value })}
                required
              />
            </div>

            {/* PRICE */}
            <div className="form-group">
              <label className="form-label">Harga (Rp) *</label>
              <input
                type="number"
                placeholder="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label className="form-label">Kategori *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Mobil">Mobil</option>
                <option value="Bus">Bus</option>
                <option value="Kereta">Kereta</option>
                <option value="Pesawat">Pesawat</option>
              </select>
            </div>

            {/* PART NUMBER */}
            <div className="form-group">
              <label className="form-label">Part No.</label>
              <input
                type="text"
                placeholder="e.g., PN-12345"
                value={form.part_number}
                onChange={(e) => setForm({ ...form, part_number: e.target.value })}
              />
            </div>

            {/* STOCK STATUS */}
            <div className="form-group">
              <label className="form-label">Status Stok</label>
              <div className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.stock_status}
                  onChange={(e) =>
                    setForm({ ...form, stock_status: e.target.checked })
                  }
                />
                <span>In Stock</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="form-group full">
              <label className="form-label">Deskripsi *</label>
              <textarea
                rows="4"
                placeholder="Berikan deskripsi lengkap mengenai produk..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              ></textarea>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="save-btn" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>

        </form>
      </main>
    </div>
  );
}
