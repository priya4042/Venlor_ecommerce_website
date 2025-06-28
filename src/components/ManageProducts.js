// src/components/ManageProducts.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  collection, query, orderBy, limit, startAfter,
  getDocs, deleteDoc, doc
} from 'firebase/firestore';
import AddProductForm from './AddProductForm';

export default function ManageProducts() {
  const PAGE_SIZE = 5;
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [pageHistory, setPageHistory] = useState([]);
  const [currentPageSnapshot, setCurrentPageSnapshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => fetchPage(), []);

  const fetchPage = async (direction = 'init') => {
    setLoading(true);
    let q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
    if (direction === 'next' && lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snap = await getDocs(q);
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setProducts(data);
    setFirstDoc(snap.docs[0]);
    setLastDoc(snap.docs[snap.docs.length - 1]);
    setCurrentPageSnapshot(snap);

    if (direction === 'next') setPageHistory([...pageHistory, snap.docs[0]]);
    if (direction === 'prev') {
      const newHistory = [...pageHistory];
      newHistory.pop();
      setPageHistory(newHistory);
    }
    setLoading(false);
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteDoc(doc(db, 'products', id));
    fetchPage();
  };

  const openAdd = () => { setEditProduct(null); setShowForm(true); };
  const openEdit = (prod) => { setEditProduct(prod); setShowForm(true); };

  return (
    <div className="manage-products">
      {!showForm && (
        <>
          <button onClick={openAdd}>+ Add Product</button>
          {loading ? <p>Loading...</p> : (
            <table>
              <thead>
                <tr>
                  <th>Image</th><th>Title</th><th>Price</th><th>Qty</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>{p.media ? <img src={p.media} width="50" /> : '—'}</td>
                    <td>{p.title}</td>
                    <td>₹{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>
                      <button onClick={() => openEdit(p)}>Edit</button>
                      <button onClick={() => onDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pagination">
            <button onClick={() => fetchPage('prev')} disabled={pageHistory.length === 0}>Prev</button>
            <button onClick={() => fetchPage('next')} disabled={products.length < PAGE_SIZE}>Next</button>
          </div>
        </>
      )}

      {showForm && (
        <AddProductForm
          existing={editProduct}
          onDone={() => { setShowForm(false); fetchPage(); }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
