// pages/AddEditPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct
} from "../services/ProductService";

export default function AddEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  // HANYA KOLOM YANG ADA DI SUPABASE
  const [form, setForm] = useState({
    manufacturer: "",
    engine_type: "",
    price: "",
    category: "Mobil",
    image: ""
  });

  // LOAD PRODUCT FOR EDIT
  useEffect(() => {
    if (!id) return;

    async function loadProduct() {
      const data = await getProductById(id);
      if (data) {
        setForm({
          manufacturer: data.manufacturer,
          engine_type: data.engine_type,
          price: data.price,
          category: data.category,
          image: data.image
        });
      }
    }

    loadProduct();
  }, [id]);

  // Handle input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Upload Image (Base64)
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  // SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // HANYA KIRIM FIELD VALID
    const payload = {
      manufacturer: form.manufacturer,
      engine_type: form.engine_type,
      price: Number(form.price),
      category: form.category,
      image: form.image
    };

    const saved = id
      ? await updateProduct(id, payload)
      : await createProduct(payload);

    setLoading(false);

    if (!saved) {
      alert("Gagal menyimpan produk!");
      return;
    }

    alert("Produk berhasil disimpan!");
    navigate("/catalog?refresh=" + Date.now());
  }

  return (
    <div className="page">
      <main className="page-content">

        <div className="addedit-wrapper">

          <div className="admin-panel">
            <b>Admin Panel:</b> Isi data produk dengan benar
          </div>

          <form className="addedit-card" onSubmit={handleSubmit}>

            {/* Upload Image */}
            <label className="form-label">Product Image</label>
            <div
              className="upload-box"
              onClick={() => document.getElementById("imgUpload").click()}
            >
              {form.image ? (
                <img src={form.image} className="upload-preview" />
              ) : (
                <div className="upload-placeholder">
                  <p>Klik untuk upload gambar</p>
                  <small>PNG, JPG max 10MB</small>
                </div>
              )}
            </div>

            <input
              id="imgUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* FORM INPUTS */}
            <div className="form-grid">

              <div className="form-group">
                <label className="form-label">Manufacturer *</label>
                <input
                  name="manufacturer"
                  value={form.manufacturer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Engine Type *</label>
                <input
                  name="engine_type"
                  value={form.engine_type}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price (IDR) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="Mobil">Mobil</option>
                  <option value="Bus">Bus</option>
                  <option value="Kereta">Kereta</option>
                  <option value="Pesawat">Pesawat</option>
                </select>
              </div>

            </div>

            <button className="save-btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : id ? "Save Changes" : "Add Product"}
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}
