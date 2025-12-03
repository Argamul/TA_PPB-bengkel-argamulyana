import { supabase } from "./SupabaseClient";

// fungsi upload gambar ke Supabase Storage
export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  // buat nama file unik
  const fileExt = file.name.split(".").pop();
  const fileName = `product_${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // upload ke bucket "product-images"
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw uploadError;
  }

  // ambil public URL
  const { data: publicURL } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return publicURL.publicUrl;
}
