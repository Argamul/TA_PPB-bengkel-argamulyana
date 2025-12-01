// src/pages/EditPartPage.jsx
import { useState, useEffect } from "react";
import { ArrowLeft, Upload, X, Loader, Image as ImageIcon } from "lucide-react";
// import partService from "../services/partService"; // Service does not exist - disabled
import uploadService from "../services/uploadService";

export default function EditPartPage({ partId, onBack, onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    category: "mesin",
    description: "",
    price: "",
  });

  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Load part data
  useEffect(() => {
    const loadPart = async () => {
      try {
        setLoading(true);
        // partService does not exist - TODO: implement proper Supabase query
        throw new Error("Part service not implemented. Please load parts from Supabase.");
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat memuat sparepart");
        setLoading(false);
      }
    };

    if (partId) loadPart();
  }, [partId]);

  // Image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar max 5MB");
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Format harus JPG, PNG, atau WEBP");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const handleRemoveNewImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleRemoveOriginalImage = () => {
    setCurrentImageUrl("");
  };

  // Handle form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validate = () => {
    if (!formData.name.trim()) {
      setError("Nama sparepart wajib diisi");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setError("Harga harus lebih dari 0");
      return false;
    }
    return true;
  };

  // Submit form (PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setUpdating(true);

      const updateData = {};

      if (imageFile) {
        setUploading(true);
        const uploadResult = await uploadService.uploadImage(imageFile);
        if (uploadResult.success) {
          updateData.image = uploadResult.data.url;
        } else {
          throw new Error("Gagal upload gambar");
        }
        setUploading(false);
      } else if (!currentImageUrl && !imageFile) {
        updateData.image = "";
      }

      updateData.name = formData.name.trim();
      updateData.category = formData.category;
      updateData.description = formData.description.trim();
      updateData.price = parseInt(formData.price);

      const result = await partService.updatePart(partId, updateData);

      if (result.success) {
        alert("Sparepart berhasil diperbarui!");
        onSuccess?.(result.data);
      } else {
        throw new Error("Gagal update sparepart");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="p-4 border-b bg-white sticky top-0 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-green-700">
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Edit Sparepart</h1>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-xl">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image upload */}
          <div>
            <label className="block font-medium mb-2">Foto Sparepart</label>

            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} className="w-full h-56 object-cover rounded-xl" />
                <button onClick={handleRemoveNewImage} type="button"
                  className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full">
                  <X />
                </button>
              </div>
            ) : currentImageUrl ? (
              <div className="relative">
                <img src={currentImageUrl} className="w-full h-56 object-cover rounded-xl" />
                <button onClick={handleRemoveOriginalImage} type="button"
                  className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full">
                  <X />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-400 p-8 rounded-xl text-center">
                <input type="file" id="imageUpload"
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleImageChange}
                  className="hidden" />
                <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
                  <ImageIcon className="w-10 h-10 text-blue-600" />
                  <span className="mt-2 text-gray-600">Upload gambar (max 5MB)</span>
                </label>
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Nama Sparepart</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full p-3 border rounded-xl" />
            </div>

            <div>
              <label>Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full p-3 border rounded-xl">
                <option value="mesin">Mesin</option>
                <option value="ban">Ban</option>
                <option value="bogie">Bogie</option>
                <option value="turbin">Turbin Pesawat</option>
                <option value="interior">Interior</option>
              </select>
            </div>
          </div>

          <div>
            <label>Harga Sparepart (Rp)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange}
              className="w-full p-3 border rounded-xl" />
          </div>

          <div>
            <label>Deskripsi</label>
            <textarea name="description" rows="4" value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl resize-none"></textarea>
          </div>

          {/* Submit buttons */}
          <div className="flex gap-4">
            <button type="button" onClick={onBack}
              className="flex-1 p-3 border rounded-xl text-gray-600">
              Batal
            </button>
            <button type="submit"
              className="flex-1 p-3 bg-green-700 text-white rounded-xl font-medium">
              {updating ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
