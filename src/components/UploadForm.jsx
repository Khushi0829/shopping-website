import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setMessage('Uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Clothing Item</h2>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} required />
        <input type="file" onChange={e => setImage(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UploadForm;
