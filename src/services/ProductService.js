// services/ProductService.js
import { supabase } from "./SupabaseClient";

// ============================
// GET ALL PRODUCTS
// ============================
export async function getAllProducts() {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

// ============================
// GET PRODUCTS BY CATEGORY
// ============================
export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CATEGORY ERROR:", error);
    return [];
  }

  return data || [];
}

// ============================
// GET PRODUCT BY ID
// ============================
export async function getProductById(id) {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("SUPABASE GET ERROR:", error);
    return null;
  }

  return data;
}

// ============================
// CREATE PRODUCT
// ============================
export async function createProduct(product) {
  const { data, error } = await supabase
    .from("spare_parts")
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error("CREATE ERROR:", error);
    return null;
  }

  return data;
}

// ============================
// UPDATE PRODUCT
// ============================
export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("spare_parts")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("UPDATE ERROR:", error);
    return null;
  }

  return data;
}
