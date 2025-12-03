import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DesktopNavbar from "../components/navbar/DesktopNavbar";
import MobileNavbar from "../components/navbar/MobileNavbar";

import {
  getProductById,
  createProduct,
  updateProduct,
} from "../services/ProductService";

import { uploadImage } from "../services/uploadService";

export default function AddEditPage() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    category: "bus",
    price: 0,
    stock: 0,
    image: "",
    description: "",
  });

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await getProductById(id);
        setForm(data);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      await updateProduct(id, form);
      alert("Produk berhasil diperbarui");
    } else {
      await createProduct(form);
      alert("Produk baru berhasil ditambahkan");
    }
  }

  async function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    setForm((f) => ({ ...f, image: url }));
  }

  return (
    <div className="page">
      <DesktopNavbar />
      <MobileNavbar />

      <main className="page-content">
        <h1>{id ? "Edit Produk" : "Tambah Produk"}</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nama Produk
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </label>

          <label>
            Kategori
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="bus">Bus</option>
              <option value="mobil">Mobil</option>
              <option value="lokomotif">Lokomotif</option>
              <option value="pesawat">Pesawat</option>
            </select>
          </label>

          <label>
            Harga
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Stok
            <input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </label>

          <label>
            Gambar
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>

          {form.image && (
            <img src={form.image} alt="Preview" className="preview-img" />
          )}

          <label>
            Deskripsi
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>

          <button className="btn primary" type="submit">
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
}
