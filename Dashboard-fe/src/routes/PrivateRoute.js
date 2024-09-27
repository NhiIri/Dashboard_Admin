import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user?.access_token || localStorage.getItem('access_token');

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

