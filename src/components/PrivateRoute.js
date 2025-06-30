// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  return user ? children : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
