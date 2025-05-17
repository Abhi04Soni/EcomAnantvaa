"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Products").select("*");
    if (!error) setProducts(data);
    else console.error(error);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const { error } = await supabase.from("Products").delete().eq("id", id);
      if (error) alert("Error deleting product");
      else
        fetchProducts();
    }
  };

  useEffect(() => {     
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-[rgb(82,52,26)]">Admin Dashboard</h1>

      <div className="mb-6">
        <Link to="/admin/add-product">
          <button className="bg-[rgb(82,52,26)] text-white px-5 py-2 rounded-md hover:bg-[#5e3920] transition font-medium shadow">
            + Add New Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow text-black">
            <thead className="bg-gray-100 text-[rgb(82,52,26)] font-semibold">
              <tr>
                <th className="px-4 py-3 border">Image</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Price</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="text-center hover:bg-gray-50 transition">
                  <td className="px-3 py-2 border">
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="h-16 w-16 object-cover mx-auto rounded-md"
                    />
                  </td>
                  <td className="px-3 py-2 border">{prod.name}</td>
                  <td className="px-3 py-2 border">₹{prod.sale_price}</td>
                  <td className="px-3 py-2 border">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${prod.is_sold_out ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                      {prod.is_sold_out ? "Sold Out" : "In Stock"}
                    </span>
                  </td>
                  <td className="px-3 py-2 space-x-2 flex justify-center items-center">
                    <Link to={`/admin/edit-product/${prod.id}`}>
                      <button className="text-blue-600 hover:text-blue-800 transition">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(prod.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
