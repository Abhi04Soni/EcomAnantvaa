import { supabase } from "@/Clients/SupabaseClient";

const addProduct = async ( selectedProduct ) => {
  const { error } = await supabase
  .from("Products")
  .upsert([
      {
          ...selectedProduct,
      },
      ]);
  if (error) {
      console.error("Error pushing product to supabase:", error);
      return false;
  }
  return true;

}
export default addProduct;