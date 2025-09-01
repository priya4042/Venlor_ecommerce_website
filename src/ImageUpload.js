import React, { useState } from "react";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "velnor_uploads"); // ✅ Your preset name
    data.append("cloud_name", "dtyzd2f4w"); // ✅ Your Cloudinary cloud_name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtyzd2f4w/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setUploadUrl(result.secure_url);
      alert("Upload Successful ✅");
    } catch (err) {
      console.error("Upload Error ❌", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Product Image</h2>
      <input type="file" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" width="200" style={{ marginTop: 10 }} />}
      <br />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>Upload</button>
      {uploadUrl && (
        <div style={{ marginTop: 10 }}>
          <p>Uploaded Image URL:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">{uploadUrl}</a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
