import React, { useEffect, useState } from "react";
import { verifyToken } from "../api/auth";
import { Navigate } from "react-router-dom";

const ProductedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyToken();
      setIsValid(result.valid);
    };
    checkAuth();
  }, []);
  if (isValid === null) {
    return <p>Checking authentication.....</p>;
  }

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProductedRoute;
