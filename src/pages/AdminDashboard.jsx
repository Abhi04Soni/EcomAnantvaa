"use client";
import { useEffect, useState } from "react";
import { supabase } from '../utils/SupabaseClient'
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Products").select("*");
    if (!error) setProducts(data);
    else console.error(error);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-4">
        <Link to="/admin/add-product">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md">
            + Add New Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full table-auto border text-red-500">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td className="border px-2 py-1">
                  <img
                    src={prod.image_url}
                    alt={prod.name}
                    className="h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-1">{prod.name}</td>
                <td className="border px-2 py-1">Rs. {prod.sale_price}</td>
                <td className="border px-2 py-1">
                  {prod.is_sold_out ? "Sold Out" : "In Stock"}
                </td>
                <td className="border px-2 py-1 space-x-2">
                  <Link href={`/admin/edit-product/${prod.id}`}>
                    <button className="text-blue-600">Edit</button>
                  </Link>
                  <button className="text-red-600" onClick={() => handleDelete(prod.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    const { error } = await supabase.from("Products").delete().eq("id", id);
    if (error) alert("Error deleting");
    else window.location.reload();
  }
};

export default AdminDashboard;
