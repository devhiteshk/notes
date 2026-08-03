/**
 * AuthCallback.jsx
 *
 * The backend OAuth success handler sets an HttpOnly cookie and redirects
 * here. There is nothing to read from the URL — the cookie is already set.
 * We just forward the user to the dashboard.
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { initCsrf } from "../utils/csrf";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      navigate(`/login?error=${error}`, { replace: true });
      return;
    }
    // New session just started — fetch a fresh CSRF token, then go to dashboard
    initCsrf().finally(() => {
      navigate("/dashboard", { replace: true });
    });
  }, [navigate, error]);

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
      <CircularProgress sx={{ color: "#7C3AED" }} />
      <Typography fontFamily="Inter, sans-serif" fontSize={15} color="#6B7280">
        Signing you in…
      </Typography>
    </Box>
  );
}
