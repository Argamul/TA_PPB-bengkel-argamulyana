import { useState } from 'react';
import { ArrowLeft, Upload, X, Save, Camera } from 'lucide-react';

export default function AddEditPartPage({ navigateTo, editProduct = null }) {
  const [formData, setFormData] = useState(editProduct || {
    name: '',
    manufacturer: '',
    engineType: '',
    price: '',
    category: 'car',
    description: '',
    partNumber: '',
    inStock: true,
  });
  
  const [imagePreview, setImagePreview] = useState(editProduct?.image || null);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving product:', formData);
    setSaved(true);
    setTimeout(() => {
      navigateTo('catalog');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateTo('catalog')}
              className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Cancel</span>
            </button>
            <h1 className="text-[#0A1A3F]">
              {editProduct ? 'Edit Part' : 'Add New Part'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-[20px] shadow-lg p-8">
          {/* Admin Notice */}
          <div className="bg-[#FF7A00]/10 border-2 border-[#FF7A00]/30 rounded-[20px] p-4 mb-8">
            <p className="text-[#0A1A3F]">
              <strong>Admin Panel:</strong> Fill in the product details below
            </p>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-[#0A1A3F] mb-3">Product Image</label>
            
            {imagePreview ? (
              <div className="relative bg-slate-50 rounded-[20px] p-8 border-2 border-dashed border-slate-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-contain mb-4"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="block bg-slate-50 rounded-[20px] p-12 border-2 border-dashed border-slate-300 hover:border-[#FF7A00] cursor-pointer transition-all">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Click to upload image</p>
                  <p className="text-sm text-slate-400">PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-[#0A1A3F] mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Turbocharger Assembly"
              required
              className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Two Column Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Manufacturer */}
            <div>
              <label className="block text-[#0A1A3F] mb-2">Manufacturer *</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                placeholder="e.g., Toyota, Boeing"
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Engine Type */}
            <div>
              <label className="block text-[#0A1A3F] mb-2">Engine Type *</label>
              <input
                type="text"
                name="engineType"
                value={formData.engineType}
                onChange={handleInputChange}
                placeholder="e.g., V8, Diesel, Jet"
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-[#0A1A3F] mb-2">Price (USD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[#0A1A3F] mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="aircraft">Aircraft</option>
              </select>
            </div>

            {/* Part Number */}
            <div>
              <label className="block text-[#0A1A3F] mb-2">Part Number</label>
              <input
                type="text"
                name="partNumber"
                value={formData.partNumber}
                onChange={handleInputChange}
                placeholder="e.g., PN-12345"
                className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
              />
            </div>

            {/* Stock Status */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-6 h-6 rounded-lg border-2 border-slate-300 text-[#FF7A00] focus:ring-[#FF7A00]"
                />
                <span className="text-[#0A1A3F]">In Stock</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-[#0A1A3F] mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide detailed product description..."
              required
              rows={6}
              className="w-full px-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none resize-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saved}
            className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-[20px] shadow-lg transition-all ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-[#FF7A00] hover:bg-[#ff8a1a] text-white'
            }`}
          >
            <Save className="w-5 h-5" />
            {saved ? 'Saved Successfully!' : editProduct ? 'Update Part' : 'Save Part'}
          </button>
        </form>
      </div>
    </div>
  );
}
