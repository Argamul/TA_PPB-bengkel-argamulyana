import { supabase } from "./SupabaseClient";

export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .eq("category", category)

  if (error) {
    console.error("Supabase error:", error);
    return []; // FIX: selalu return array
  }

  return data || []; // FIX: tidak mungkin null
}

export async function getAllProducts() {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

export async function getProductById(category) {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*")
    .eq("category", category)

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data;
}

export async function createProduct() {
  const { data, error } = await supabase
    .from("spare_parts")
    .select();

  if (error) {
    console.error("Create error:", error);
    throw error;
  }

  return data?.[0];
}

export async function updateProduct(id, payload) {
  const { data, error } = await supabase
    .from("spare_parts")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Update error:", error);
    throw error;
  }

  return data?.[0];
}
