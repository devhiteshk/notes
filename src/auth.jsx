/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

const API = import.meta.env.VITE_APP_API_URL;

/**
 * Verifies the session by calling /auth/me with the HttpOnly cookie.
 * Shows a spinner while the check is in-flight, then either renders
 * the protected element or redirects to /login.
 */
const ProtectedRoute = ({ element }) => {
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "fail"

  useEffect(() => {
    axios
      .get(`${API}/auth/me`, { withCredentials: true })
      .then(() => setStatus("ok"))
      .catch(() => setStatus("fail"));
  }, []);

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress sx={{ color: "#7C3AED" }} />
      </Box>
    );
  }

  return status === "ok" ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
