"use client";
import { useState , useEffect } from "react";
import { supabase } from '../utils/SupabaseClient'
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description:"",
    category:"",
    sale_price: 0,
    original_price: 0,
    is_sold_out: false,
    image_url:'',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImages();
    setForm({...form, image_url: JSON.stringify(uploadedUrls)});
    console.log(uploadedUrls, form);
    const { error } = await supabase.from("Products").insert([form]);
    if (!error) navigate("/admin/dashboard");
    else alert("Failed to add product");
  };

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

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
  useEffect(() => {
    console.log("Uploaded URLs updated:", uploadedUrls);
  }, [uploadedUrls]);

  return (
    <div className="max-w-xl mx-auto py-10 text-black">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product name"
          className="w-full p-2 border"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Product description"
          className="w-full p-2 border mb-4"
          rows={4}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full p-2 border mb-4"
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="kurti">Kurti</option>
          <option value="top">Top</option>
          <option value="dress">Dress</option>
          <option value="other">Other</option>
        </select>
        <div className="p-4 border rounded-md w-full max-w-md mx-auto">
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full p-2 border mb-4"
            onChange={handleFileChange}
          />

          {previews.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {previews.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Preview ${index}`} className="w-full h-auto" />
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                  >
                  ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          name="original_price"
          placeholder="Original Price"
          className="w-full p-2 border"
          type="number"
          onChange={handleChange}
        />
        <input
          name="sale_price"
          placeholder="Sale Price"
          className="w-full p-2 border"
          type="number"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
