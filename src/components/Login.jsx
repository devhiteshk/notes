import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

// ─── field styles ─────────────────────────────────────────────────────────────
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    fontFamily: "Inter, sans-serif",
    fontSize: 15,
    backgroundColor: "#FAFAFA",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#A78BFA" },
    "&.Mui-focused fieldset": { borderColor: "#7C3AED", borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "#6B7280",
    "&.Mui-focused": { color: "#7C3AED" },
  },
};

// ─── left panel decoration dots ───────────────────────────────────────────────
function Dot({ size, top, left, opacity = 0.15 }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: `rgba(255,255,255,${opacity})`,
        top,
        left,
      }}
    />
  );
}

// ─── component ────────────────────────────────────────────────────────────────
export default function LoginComponent() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        { email, password }
      );

      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid email or password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* ── Left branding panel ── */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: "0 0 45%",
          background: "linear-gradient(145deg, #5B21B6 0%, #7C3AED 45%, #A855F7 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <Dot size={320} top={-80} left={-80} />
        <Dot size={200} top="35%" left="60%" opacity={0.08} />
        <Dot size={150} top="75%" left={-40} opacity={0.1} />

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, position: "relative" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NoteAltOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
          </Box>
          <Typography
            fontFamily="Poppins, sans-serif"
            fontWeight={700}
            fontSize={22}
            sx={{ color: "#fff" }}
          >
            Notes
          </Typography>
        </Box>

        {/* Center copy */}
        <Box sx={{ position: "relative" }}>
          <Typography
            fontFamily="Poppins, sans-serif"
            fontWeight={700}
            sx={{
              fontSize: { md: 36, lg: 44 },
              color: "#fff",
              lineHeight: 1.2,
              mb: 2,
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back.
            <br />
            Your notes
            <br />
            are waiting.
          </Typography>
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6 }}
          >
            Pick up right where you left off — notes, folders, canvases, all in one place.
          </Typography>
        </Box>

        {/* Bottom quote */}
        <Box sx={{ position: "relative" }}>
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              borderLeft: "2px solid rgba(255,255,255,0.25)",
              pl: 2,
            }}
          >
            &ldquo;The faintest ink is more powerful than the strongest memory.&rdquo;
          </Typography>
        </Box>
      </Box>

      {/* ── Right form panel ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          px: { xs: 3, sm: 6, md: 8 },
          py: 6,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 400 }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            {/* Mobile logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <NoteAltOutlinedIcon sx={{ color: "#7C3AED", fontSize: 26 }} />
              <Typography
                fontFamily="Poppins, sans-serif"
                fontWeight={700}
                fontSize={20}
                sx={{ color: "#0F0A1E" }}
              >
                Notes
              </Typography>
            </Box>

            <Typography
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              sx={{ fontSize: { xs: 26, md: 32 }, color: "#0F0A1E", mb: 1, letterSpacing: "-0.02em" }}
            >
              Sign in
            </Typography>
            <Typography
              fontFamily="Inter, sans-serif"
              sx={{ fontSize: 15, color: "#6B7280" }}
            >
              Don&#39;t have an account?{" "}
              <Link
                onClick={() => navigate("/signup")}
                sx={{
                  color: "#7C3AED",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign up free
              </Link>
            </Typography>
          </Box>

          {/* Error alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSignIn}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              label="Email address"
              type="email"
              required
              fullWidth
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={fieldSx}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={fieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                      sx={{ color: "#9CA3AF" }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon fontSize="small" />
                      ) : (
                        <VisibilityOutlinedIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon />}
              sx={{
                mt: 0.5,
                py: 1.5,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                backgroundColor: "#7C3AED",
                borderRadius: "12px",
                boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                "&:hover": {
                  backgroundColor: "#6D28D9",
                  boxShadow: "0 6px 20px rgba(124,58,237,0.5)",
                },
                "&:disabled": {
                  backgroundColor: "#C4B5FD",
                  color: "#fff",
                  boxShadow: "none",
                },
                transition: "all 0.2s ease",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{ mt: 5, fontSize: 12, color: "#D1D5DB", textAlign: "center" }}
          >
            © {new Date().getFullYear()} Notes · Built with ♥
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}
