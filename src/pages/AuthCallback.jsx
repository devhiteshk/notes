/**
 * AuthCallback.jsx
 *
 * Handles the redirect from the backend after a successful OAuth login.
 * The backend redirects to /auth/callback#token=<jwt>
 * We read the token from the URL hash (never hits the server), store it,
 * then navigate to the dashboard.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const hash = window.location.hash; // e.g. "#token=eyJ..."
    const params = new URLSearchParams(hash.slice(1)); // strip leading "#"
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Clear the token from the URL before navigating so it doesn't linger
      window.history.replaceState(null, "", window.location.pathname);
      navigate("/dashboard", { replace: true });
    } else {
      setError("No token received from the server. Please try signing in again.");
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 3,
        backgroundColor: "#fff",
      }}
    >
      {error ? (
        <Typography
          fontFamily="Inter, sans-serif"
          fontSize={15}
          color="#EF4444"
          textAlign="center"
          px={3}
        >
          {error}
        </Typography>
      ) : (
        <>
          <CircularProgress sx={{ color: "#7C3AED" }} />
          <Typography fontFamily="Inter, sans-serif" fontSize={15} color="#6B7280">
            Signing you in…
          </Typography>
        </>
      )}
    </Box>
  );
}
