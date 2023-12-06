import { Navigate, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

interface PrivateRoutesProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const PrivateRoutes = ({
  component: Component,
  ...rest
}: PrivateRoutesProps) => {
  const userData = localStorage.getItem("userDetails") || "";

  if (userData) {
    var firstLogin = JSON.parse(userData);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!firstLogin) {
      navigate("/login");
    }
  }, [firstLogin, navigate]);

  if (!firstLogin) {
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoutes;
