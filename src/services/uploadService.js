import { supabase } from "../config/supabaseClient";

class UploadService {
  /**
   * Upload image to Supabase Storage
   * @param {File} file - image file
   * @param {string} bucketName - storage bucket name (default "parts-images")
   */
  async uploadImage(file, bucketName = "parts-images") {
    try {
      if (!file) throw new Error("Tidak ada file yang dipilih.");

      // Validate type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Format file harus .jpg, .jpeg, .png, atau .webp");
      }

      // Validate size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("Ukuran file maksimal 5MB");
      }

      // Unique filename
      const fileName = `${Date.now()}-${file.name}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (error) throw new Error("Gagal upload gambar: " + error.message);

      // Generate public URL
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return {
        success: true,
        url: publicUrlData.publicUrl,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default new UploadService();
