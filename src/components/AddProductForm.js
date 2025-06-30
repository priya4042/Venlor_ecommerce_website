import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import TiptapEditor from './TiptapEditor';
import heic2any from 'heic2any';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddProductForm({ existing, onDone, onCancel }) {
  const initial = existing
    ? {
        ...existing,
        media: Array.isArray(existing.media) ? existing.media : [existing.media],
        mediaFiles: [],
        colors: existing.colors || [],
      }
    : {
        title: '', description: '', status: 'Active', media: [], mediaFiles: [],
        category: '', type: '', vendor: '', collections: '', tags: '',
        price: '', compareAtPrice: '', cost: '', chargeTax: true,
        trackQuantity: true, quantity: '', continueSelling: false, sku: '',
        isPhysical: true, weight: '', seoTitle: '', seoDescription: '',
        colors: [],
      };

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        ...initial,
        media: Array.isArray(existing.media) ? existing.media : [existing.media],
      });
    }
  }, [existing]);

  useEffect(() => {
    const urls = form.mediaFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [form.mediaFiles]);

  const handleChange = async (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === 'file') {
      const fileArray = await convertFilesToJPG(Array.from(files));
      setForm(f => ({ ...f, mediaFiles: [...f.mediaFiles, ...fileArray] }));
    } else if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const convertFilesToJPG = async (files) => {
    const convertedFiles = await Promise.all(files.map(async (file) => {
      try {
        if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
          const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.95 });
          return new File([blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
        } else if (file.type === 'image/jpeg') {
          return file;
        } else if (file.type.startsWith('image/')) {
          const imageBitmap = await createImageBitmap(file);
          const canvas = document.createElement('canvas');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(imageBitmap, 0, 0);
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
          return new File([blob], file.name.replace(/\..+$/, '.jpg'), { type: 'image/jpeg' });
        }
        return null;
      } catch (err) {
        alert(`${file.name} could not be converted.`);
        return null;
      }
    }));
    return convertedFiles.filter(Boolean);
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'velnor_uploads');
    data.append('folder', 'velnor-products');

    const res = await fetch('https://api.cloudinary.com/v1_1/dtyzd2f4w/image/upload', {
      method: 'POST',
      body: data,
    });

    const d = await res.json();
    return d.secure_url;
  };

  const handleAddColor = () => {
    const trimmed = newColor.trim();
    if (trimmed && !form.colors.includes(trimmed)) {
      setForm(f => ({ ...f, colors: [...f.colors, trimmed] }));
      setNewColor('');
      setShowColorModal(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadingImages(true);

    try {
      let uploadedMedia = [...form.media];

      if (form.mediaFiles.length > 0) {
        const uploadPromises = form.mediaFiles.map(uploadImage);
        const uploadedUrls = await Promise.all(uploadPromises);
        uploadedMedia = [...uploadedMedia, ...uploadedUrls];
      }

      const payload = {
        ...form,
        media: uploadedMedia,
        price: parseFloat(form.price),
        compareAtPrice: parseFloat(form.compareAtPrice),
        cost: parseFloat(form.cost),
        quantity: parseInt(form.quantity),
        weight: parseFloat(form.weight),
        createdAt: existing?.createdAt || new Date().toISOString(),
      };

      delete payload.mediaFiles;

      if (existing) {
        await updateDoc(doc(db, 'products', existing.id), payload);
        alert('Product updated');
      } else {
        await addDoc(collection(db, 'products'), payload);
        alert('Product added');
      }

      onDone();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setUploadingImages(false);
      setLoading(false);
    }
  };

  return (
    <>
      {uploadingImages && (
        <div className="upload-loader-overlay">
          <div className="upload-spinner"></div>
          <p className="uploading-text">Uploading images...</p>
        </div>
      )}

      {/* Color Modal */}
      {showColorModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Add Color</h4>
            <input
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Enter color name"
            />
            <button onClick={handleAddColor}>Add</button>
            <button onClick={() => setShowColorModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <form onSubmit={onSave} className="product-form-container">
        <button type="button" className="form-close-btn" onClick={onCancel}>×</button>
        <h2 className="form-heading">{existing ? 'Edit Product' : 'Add Product'}</h2>

         <div className="form-sections">
          <div className="form-left">
            <div className="card-section">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Product Title" required />

             <label>Description</label>
                <div className="ckeditor-wrapper">
                <CKEditor
                    editor={ClassicEditor}
                    data={form.seoDescription}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    setForm(f => ({ ...f, seoDescription: data }));
                    }}
                />
                </div>

              <label>Media</label>
              <div
                className="media-upload-container"
                onDragOver={(e) => e.preventDefault()}
                onDrop={async (e) => {
                  e.preventDefault();
                  const droppedFiles = await convertFilesToJPG(Array.from(e.dataTransfer.files));
                  setForm(f => ({
                    ...f,
                    mediaFiles: [...f.mediaFiles, ...droppedFiles],
                  }));
                }}
              >
                <input type="file" multiple accept="image/*" onChange={handleChange} />
                <p>Click or drag images here to upload</p>
              </div>

              <div className="media-preview-grid">
                {[...form.media, ...previewUrls].map((img, idx) => (
                  <div key={idx} className="preview-wrapper">
                    <img src={img} alt={`Preview ${idx}`} className="preview-img" />
                    <button
                      type="button"
                      className="remove-img-btn"
                      onClick={() => {
                        if (idx < form.media.length) {
                          setForm(f => ({
                            ...f,
                            media: f.media.filter((_, i) => i !== idx)
                          }));
                        } else {
                          const mediaIdx = idx - form.media.length;
                          setForm(f => ({
                            ...f,
                            mediaFiles: f.mediaFiles.filter((_, i) => i !== mediaIdx)
                          }));
                        }
                      }}
                    >×</button>
                  </div>
                ))}
              </div>

             <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="shirt">Shirt</option>
                <option value="t-shirt">T-Shirt</option>
                <option value="pant">Pant</option>
                <option value="trouser">Trouser</option>
                </select>

            </div>
          </div>

          <div className="form-right">
            <div className="card-section">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Active</option>
                <option>Draft</option>
              </select>

              <label>Type</label>
              <input name="type" value={form.type} onChange={handleChange} />
              <label>Vendor</label>
              <input name="vendor" value={form.vendor} onChange={handleChange} />
              <label>Collections</label>
              <input name="collections" value={form.collections} onChange={handleChange} />
              <label>Tags</label>
              <input name="tags" value={form.tags} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="card-section">
          <h3>Pricing</h3>
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price ₹" />
          <input type="number" name="compareAtPrice" value={form.compareAtPrice} onChange={handleChange} placeholder="Compare at Price ₹" />
          <input type="number" name="cost" value={form.cost} onChange={handleChange} placeholder="Cost ₹" />
          <label><input type="checkbox" name="chargeTax" checked={form.chargeTax} onChange={handleChange} /> Charge Tax</label>
        </div>

        <div className="card-section">
          <h3>Inventory</h3>
          <label><input type="checkbox" name="trackQuantity" checked={form.trackQuantity} onChange={handleChange} /> Track Quantity</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
          <label><input type="checkbox" name="continueSelling" checked={form.continueSelling} onChange={handleChange} /> Continue selling when out of stock</label>
          <input name="sku" value={form.sku} onChange={handleChange} placeholder="SKU / Barcode" />
        </div>

        <div className="card-section">
          <h3>Shipping</h3>
          <label><input type="checkbox" name="isPhysical" checked={form.isPhysical} onChange={handleChange} /> This is a physical product</label>
          <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight in kg" />
        </div>

        <div className="card-section">
          <h3>Variants</h3>
          <label>Color Variants</label>
          <select>
            {form.colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
          <button type="button" onClick={() => setShowColorModal(true)}>+ Add Color</button>
        </div>

        <div className="card-section">
          <h3>Search Engine Listing</h3>
          <input
            name="seoTitle"
            value={form.seoTitle}
            onChange={handleChange}
            placeholder="SEO Title"
          />
          <TiptapEditor
            content={form.seoDescription}
            onChange={html => setForm(f => ({ ...f, seoDescription: html }))}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </form>
    </>
  );
}
