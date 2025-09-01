// src/utils/cloudinaryUpload.js
import axios from 'axios';

export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "your_upload_preset"); // 🔁 Replace it
  data.append("cloud_name", "dtyzd2f4w"); // 👈 Your cloud name

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dtyzd2f4w/image/upload",
      data
    );
    return res.data.secure_url; // ✅ Image URL
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};
