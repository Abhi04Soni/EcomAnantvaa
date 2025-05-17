"use client";
import { useState, useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";
import { useNavigate } from "react-router-dom";
import {
  X,
  Package,
  AlignLeft,
  IndianRupee,
  Tag,
  Upload,
} from "lucide-react";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    sale_price: 0,
    original_price: 0,
    is_sold_out: false,
    image_url: "",
  });

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    const previewImages = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews((prev) => [...prev, ...previewImages]);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const urls = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (error) {
        console.error("Upload failed:", error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      urls.push(data.publicUrl);
    }

    setUploadedUrls(urls);
    setFiles([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImages();
    const updatedForm = { ...form, image_url: JSON.stringify(uploadedUrls) };
    const { error } = await supabase.from("Products").insert([updatedForm]);
    if (!error) navigate("/admin/dashboard");
    else alert("Failed to add product");
  };

  useEffect(() => {
    console.log("Uploaded URLs updated:", uploadedUrls);
  }, [uploadedUrls]);

  return (
    <div className=" py-10 text-black px-4 bg-[rgb(239,215,167)] w-full mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-[rgb(82,52,26)]">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow border max-w-3xl">
        {/* Product Name */}
        <div className="flex items-center gap-2">
          <Package className="text-gray-500" size={20} />
          <input
            name="name"
            placeholder="Product name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-2">
          <AlignLeft className="mt-2 text-gray-500" size={20} />
          <textarea
            name="description"
            placeholder="Product description"
            className="w-full p-2 border rounded"
            rows={4}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <Tag className="text-gray-500" size={20} />
          <select
            name="category"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="kurti">Kurti</option>
            <option value="top">Top</option>
            <option value="dress">Dress</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Image Upload */}
        
        <div className="flex items-center gap-2">
        <Upload className="text-gray-500  cursor-pointer" size={20} />
          <div className="flex items-center gap-2 mb-3 w-full p-2 border rounded">
            
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="w-full  cursor-pointer"
              onChange={handleFileChange}
            />
          </div>

          {/* Preview Section */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((url, index) => (
                <div key={index} className="relative border rounded overflow-hidden">
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="text-gray-500" size={20} />
            <input
              name="original_price"
              placeholder="Original Price"
              className="w-full p-2 border rounded"
              type="number"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="text-gray-500" size={20} />
            <input
              name="sale_price"
              placeholder="Sale Price"
              className="w-full p-2 border rounded"
              type="number"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[rgb(82,52,26)] hover:bg-[#5e3920] text-white px-6 py-2 rounded-md font-semibold transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
