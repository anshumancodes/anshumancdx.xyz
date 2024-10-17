
import React, { useState, useEffect } from 'react';
import { account } from "../../config/appwriteconfig";
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get(); // Get user info from Appwrite

        // Check if username is 'anshumancdx' or user has 'admin' role (assuming 'role' is stored in prefs)
        if (user.name === 'anshumancdx' || (user.prefs && user.prefs.role === 'admin')) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking the user's auth status
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
