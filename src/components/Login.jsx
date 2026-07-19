import { Box, Button, Divider, Typography, Alert } from "@mui/material";
import image from "./../assets/diary-journal-color-icon.svg";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

// ─── GitHub icon (inline SVG — no extra dependency) ───────────────────────────
function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.476 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Google icon ──────────────────────────────────────────────────────────────
function GoogleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ─── decoration dot ───────────────────────────────────────────────────────────
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
        pointerEvents: "none",
      }}
    />
  );
}

const perks = [
  "Sign in once, access from any device",
  "No passwords to remember or reset",
  "Your notes stay private and secure",
  "Powered by trusted OAuth providers",
];

const API = import.meta.env.VITE_APP_API_URL;

// ─── component ────────────────────────────────────────────────────────────────
export default function LoginComponent() {
  const [searchParams] = useSearchParams();
  const oauthError = searchParams.get("error");

  const handleGoogle = () => {
    window.location.href = `${API}/auth/google`;
  };

  const handleGitHub = () => {
    window.location.href = `${API}/auth/github`;
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
            <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
              <img src={image} width="100%" height="100%" alt="Notes logo" />
            </Box>
          </Box>
          <Typography fontFamily="Caveat, cursive" fontWeight={700} fontSize={22} sx={{ color: "#fff" }}>
            Notes <span style={{fontSize: 10}}> by HivarSoft </span>
          </Typography>
        </Box>

        {/* Center copy */}
        <Box sx={{ position: "relative" }}>
          <Typography
            fontFamily="Poppins, sans-serif"
            fontWeight={700}
            sx={{ fontSize: { md: 36, lg: 44 }, color: "#fff", lineHeight: 1.2, mb: 3, letterSpacing: "-0.02em" }}
          >
            Welcome back.
            <br />
            Your notes
            <br />
            are waiting.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {perks.map((perk) => (
              <Box key={perk} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CheckCircleOutlineIcon sx={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }} />
                <Typography fontFamily="Inter, sans-serif" sx={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>
                  {perk}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom quote */}
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
          &ldquo;The faintest ink is more powerful than the strongest memory.&rdquo;
        </Typography>
      </Box>

      {/* ── Right panel ── */}
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
          {/* Mobile logo */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1, mb: 4 }}>
            <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
              <img src={image} width="100%" height="100%" alt="Notes logo" />
            </Box>
            <Typography fontFamily="Poppins, sans-serif" fontWeight={700} fontSize={20} sx={{ color: "#0F0A1E" }}>
              Notes
            </Typography>
          </Box>

          {/* Heading */}
          <Box sx={{ mb: 5 }}>
            <Typography
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              sx={{ fontSize: { xs: 26, md: 32 }, color: "#0F0A1E", mb: 1, letterSpacing: "-0.02em" }}
            >
              Sign in to Notes
            </Typography>
            <Typography fontFamily="Inter, sans-serif" sx={{ fontSize: 15, color: "#6B7280" }}>
              Use your GitHub or Google account — no password needed.
            </Typography>
          </Box>

          {/* OAuth error */}
          {oauthError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
              {oauthError === "oauth_failed" || oauthError === "google_failed" || oauthError === "github_failed"
                ? "Sign-in failed. Please try again."
                : "Something went wrong. Please try again."}
            </Alert>
          )}

          {/* OAuth buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* GitHub */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleGitHub}
              startIcon={<GitHubIcon size={20} />}
              sx={{
                py: 1.5,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textTransform: "none",
                backgroundColor: "#24292F",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                "&:hover": {
                  backgroundColor: "#1c2128",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Continue with GitHub
            </Button>

            <Divider sx={{ color: "#9CA3AF", fontSize: 12, fontFamily: "Inter, sans-serif" }}>or</Divider>

            {/* Google */}
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogle}
              startIcon={<GoogleIcon size={20} />}
              sx={{
                py: 1.5,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textTransform: "none",
                borderColor: "#E5E7EB",
                color: "#374151",
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                "&:hover": {
                  borderColor: "#D1D5DB",
                  backgroundColor: "#F9FAFB",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Continue with Google
            </Button>
          </Box>

          {/* Fine print */}
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{ mt: 4, fontSize: 12, color: "#9CA3AF", textAlign: "center", lineHeight: 1.7 }}
          >
            By continuing, you agree to our{" "}
            <a href="/terms-of-service" style={{ color: "#7C3AED", textDecoration: "none" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" style={{ color: "#7C3AED", textDecoration: "none" }}>
              Privacy Policy
            </a>
            .
          </Typography>

          <Typography
            fontFamily="Inter, sans-serif"
            sx={{ mt: 4, fontSize: 12, color: "#D1D5DB", textAlign: "center" }}
          >
            © {new Date().getFullYear()} Notes by HivarSoft · Built with ♥
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}
