/**
 * AuthCallback.jsx
 *
 * Handles the redirect from the backend after a successful OAuth login.
 * The backend redirects to /auth/callback?token=<jwt>
 * We read the token from the query string, store it in localStorage,
 * clear it from the URL, then navigate to the dashboard.
 */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // Replace the current history entry so the token doesn't linger in the URL
      window.history.replaceState(null, "", "/auth/callback");
      navigate("/dashboard", { replace: true });
    } else {
      setError("Sign-in failed — no token received. Redirecting to login…");
      setTimeout(() => navigate("/login", { replace: true }), 2500);
    }
  }, [navigate, searchParams]);

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
