import { supabase } from "@/Clients/SupabaseClient";

const addToCart = async (productId, userId) => {
  const { error } = await supabase
    .from("cart")
    .upsert([
      {
        productId,
        userId,
      },
    ]);

  if (error) {
    console.error("Error while adding to cart", error);
    return false;
  }

  return true;
};

export default addToCart;
