import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center text-slate-400">Loading user session...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}