import { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = e => setFile(e.target.files[0]);



  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!file) return alert("Please select an image file");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("image", file); // matches upload.single("image")

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/items-with-image", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product added!");
      setForm({ name: "", price: "", category: "" });
      setFile(null);
    } 
    catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (

       <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required/>
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required/>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required/>
      <input type="file" accept="image/*" onChange={handleFile} />
      <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Add Product"}</button>
    </form>
    
  );
};

