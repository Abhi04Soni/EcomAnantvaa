import { supabase } from "@/Clients/SupabaseClient";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("Products")
    .select("*"); // Or specify fields like .select("id, name, description")

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data;
};

export default fetchProducts;
