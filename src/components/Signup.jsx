import {
  Box,
  Button,
  Grid,
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
import image from "./../assets/diary-journal-color-icon.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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

// ─── left panel decoration dot ────────────────────────────────────────────────
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

const perks = [
  "Unlimited notes & folders",
  "Infinite canvas for diagrams",
  "Built-in AI assistant",
  "Access from any device",
];

// ─── component ────────────────────────────────────────────────────────────────
export default function SignupComponent() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
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
          background:
            "linear-gradient(145deg, #5B21B6 0%, #7C3AED 45%, #A855F7 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Dot size={320} top={-80} left={-80} />
        <Dot size={200} top="35%" left="60%" opacity={0.08} />
        <Dot size={150} top="75%" left={-40} opacity={0.1} />

        {/* Logo */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, position: "relative" }}
        >
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
            <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
                        <img src={image} width="100%" height="100%" alt="Notes logo" />
                      </Box>
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
              mb: 3,
              letterSpacing: "-0.02em",
            }}
          >
            Everything you
            <br />
            need to capture
            <br />
            your best ideas.
          </Typography>

          {/* Perks list */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {perks.map((perk) => (
              <Box
                key={perk}
                sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
              >
                <CheckCircleOutlineIcon
                  sx={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}
                />
                <Typography
                  fontFamily="Inter, sans-serif"
                  sx={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}
                >
                  {perk}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom */}
        <Typography
          fontFamily="Inter, sans-serif"
          sx={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            borderLeft: "2px solid rgba(255,255,255,0.25)",
            pl: 2,
            position: "relative",
          }}
        >
          "The faintest ink is more powerful than the strongest memory."
        </Typography>
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
              <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
                          <img src={image} width="100%" height="100%" alt="Notes logo" />
                        </Box>
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
              sx={{
                fontSize: { xs: 26, md: 32 },
                color: "#0F0A1E",
                mb: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Create your account
            </Typography>
            <Typography
              fontFamily="Inter, sans-serif"
              sx={{ fontSize: 15, color: "#6B7280" }}
            >
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{
                  color: "#7C3AED",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in
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
            onSubmit={handleSignUp}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First name"
                  required
                  fullWidth
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  required
                  fullWidth
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={fieldSx}
                />
              </Grid>
            </Grid>

            <TextField
              label="Email address"
              type="email"
              required
              fullWidth
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={fieldSx}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              autoComplete="new-password"
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
              {loading ? "Creating account…" : "Create account"}
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
