// src/services/partsService.js
import { supabase } from "./SupabaseClient";

export const fetchParts = async () => {
  const { data, error } = await supabase
    .from("spare_parts")
    .select("*");

  if (error) {
    console.error("Error fetching parts:", error);
    throw error;
  }

  return data;
};
