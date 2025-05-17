import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import ProductCard from "./ProductCard";

const NewArrivalsCarousel = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const newArrivalDate = new Date();
    newArrivalDate.setDate(newArrivalDate.getDate() - 7);

    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .gte("created_at", newArrivalDate.toISOString());

    if (!error) {
      setProducts(data);
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10 overflow-x-auto scrollbar-hide">
      <h2 className="text-2xl font-semibold mb-4 text-black">New Arrivals</h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 snap-x snap-mandatory scroll-smooth w-max">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
