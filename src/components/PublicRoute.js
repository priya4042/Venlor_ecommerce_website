// src/components/PublicRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/products" replace /> : children;
};

export default PublicRoute;
