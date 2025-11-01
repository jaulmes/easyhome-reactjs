import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Pendant la vérification, affiche un loader
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h4>Loading...</h4>
      </div>
    );
  }

  // Si non connecté, redirection vers la page de login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Sinon, accès à la page demandée
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
