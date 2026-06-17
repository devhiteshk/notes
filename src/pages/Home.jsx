import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image from "./../assets/diary-journal-color-icon.svg";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ─── animation variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

// ─── features data ────────────────────────────────────────────────────────────

const features = [
  {
    icon: <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
            <img src={image} width="100%" height="100%" alt="Notes logo" />
          </Box>,
    title: "Rich Notes",
    desc: "Write, edit, and format notes with a clean, distraction-free editor that keeps your thoughts organised.",
  },
  {
    icon: <FolderOpenOutlinedIcon sx={{ fontSize: 32, color: "#7C3AED" }} />,
    title: "Smart Folders",
    desc: "Group related notes into folders. Build any structure that matches the way you think.",
  },
  {
    icon: <BrushOutlinedIcon sx={{ fontSize: 32, color: "#7C3AED" }} />,
    title: "Infinite Canvas",
    desc: "Sketch diagrams, flowcharts, and wireframes right alongside your notes — no context switching.",
  },
  {
    icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 32, color: "#7C3AED" }} />,
    title: "AI Assistant",
    desc: "Ask questions, get summaries, and brainstorm ideas with a built-in AI chat that knows your notes.",
  },
];

// ─── component ────────────────────────────────────────────────────────────────

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      className="Home"
      sx={{ minHeight: "100vh", minWidth: "100vw", overflowX: "hidden" }}
    >
      {/* ── Navbar ── */}
      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2.5, md: 6 },
          py: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.75)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
            <img src={image} width="100%" height="100%" alt="Notes logo" />
          </Box>
          <Typography
            fontFamily="Caveat, cursive"
            fontWeight={700}
            fontSize={{ xs: 22, md: 26 }}
            sx={{ color: "#1a1a2e", lineHeight: 1 }}
          >
            Notes
          </Typography>
        </Box>

        {/* Nav actions */}
        <Box sx={{ display: "flex", gap: { xs: 1, md: 1.5 }, alignItems: "center" }}>
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: { xs: 13, md: 14 },
              color: "#4B5563",
              textTransform: "none",
              minWidth: "auto",
              px: { xs: 1, md: 1.5 },
              "&:hover": { color: "#7C3AED", background: "transparent" },
            }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/signup")}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: { xs: 12, md: 14 },
              textTransform: "none",
              backgroundColor: "#7C3AED",
              borderRadius: "10px",
              px: { xs: 1.5, md: 2 },
              py: 0.75,
              boxShadow: "none",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "#6D28D9",
                boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
              },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* ── Hero ── */}
      <Container maxWidth="md" sx={{ textAlign: "center", pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
        {/* Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <Chip
            label="✨ Your second brain, beautifully organised"
            sx={{
              mb: 4,
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: 11, sm: 13 },
              fontWeight: 500,
              backgroundColor: "#F3EEFF",
              color: "#7C3AED",
              border: "1px solid #DDD6FE",
              borderRadius: "100px",
              px: 1,
              height: { xs: 30, sm: 34 },
              maxWidth: "100%",
              "& .MuiChip-label": { px: { xs: 1, sm: 1.5 } },
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <Typography
            component="h1"
            fontFamily="Poppins, sans-serif"
            fontWeight={700}
            sx={{
              fontSize: { xs: 32, sm: 48, md: 64 },
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#0F0A1E",
              mb: 3,
            }}
          >
            Capture ideas,{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              draw your thoughts
            </Box>{" "}
            and stay organised.
          </Typography>
        </motion.div>

        {/* Subheadline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{
              fontSize: { xs: 16, md: 20 },
              color: "#6B7280",
              lineHeight: 1.7,
              mb: 5,
              maxWidth: 560,
              mx: "auto",
            }}
          >
            Notes brings together rich text, infinite canvas sketching, smart
            folders, and an AI assistant — all in one place.
          </Typography>
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/signup")}
              fullWidth={false}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: { xs: 15, md: 16 },
                textTransform: "none",
                backgroundColor: "#7C3AED",
                borderRadius: "12px",
                px: { xs: 3, md: 4 },
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                "&:hover": {
                  backgroundColor: "#6D28D9",
                  boxShadow: "0 6px 24px rgba(124,58,237,0.55)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Start for free
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: { xs: 15, md: 16 },
                textTransform: "none",
                borderColor: "#D1D5DB",
                color: "#374151",
                borderRadius: "12px",
                px: { xs: 3, md: 4 },
                py: 1.5,
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  borderColor: "#7C3AED",
                  color: "#7C3AED",
                  backgroundColor: "rgba(124,58,237,0.04)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Log in
            </Button>
          </Box>
        </motion.div>

        {/* Social proof hint */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.75}
        >
          <Typography
            fontFamily="Inter, sans-serif"
            sx={{ mt: 3, fontSize: 13, color: "#9CA3AF" }}
          >
            No credit card required · Free forever plan available
          </Typography>
        </motion.div>
      </Container>

      {/* ── Features ── */}
      <Box
        sx={{
          background: "linear-gradient(180deg, transparent 0%, #FAFAFA 100%)",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* Section label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Typography
              textAlign="center"
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={13}
              letterSpacing="0.08em"
              sx={{ color: "#7C3AED", textTransform: "uppercase", mb: 1.5 }}
            >
              Everything you need
            </Typography>
            <Typography
              textAlign="center"
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              sx={{
                fontSize: { xs: 28, md: 40 },
                color: "#0F0A1E",
                mb: 1.5,
                letterSpacing: "-0.02em",
              }}
            >
              Built for how you actually think
            </Typography>
            <Typography
              textAlign="center"
              fontFamily="Inter, sans-serif"
              sx={{
                color: "#6B7280",
                fontSize: { xs: 15, md: 17 },
                maxWidth: 500,
                mx: "auto",
                mb: { xs: 5, md: 8 },
              }}
            >
              From quick notes to full diagrams — one app handles it all.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} md={3} key={f.title}>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.12}
                  style={{ height: "100%" }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 3.5,
                      borderRadius: "20px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      transition: "all 0.25s ease",
                      cursor: "default",
                      "&:hover": {
                        boxShadow: "0 8px 32px rgba(124,58,237,0.12)",
                        borderColor: "#C4B5FD",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "14px",
                        backgroundColor: "#F3EEFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2.5,
                      }}
                    >
                      {f.icon}
                    </Box>
                    <Typography
                      fontFamily="Poppins, sans-serif"
                      fontWeight={600}
                      fontSize={17}
                      sx={{ color: "#111827", mb: 1 }}
                    >
                      {f.title}
                    </Typography>
                    <Typography
                      fontFamily="Inter, sans-serif"
                      fontSize={14}
                      lineHeight={1.65}
                      sx={{ color: "#6B7280" }}
                    >
                      {f.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── CTA Banner ── */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
              borderRadius: "28px",
              px: { xs: 4, md: 8 },
              py: { xs: 6, md: 8 },
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(124,58,237,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* decorative circles */}
            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: "60px solid rgba(255,255,255,0.06)",
                top: -100,
                right: -80,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: "40px solid rgba(255,255,255,0.06)",
                bottom: -60,
                left: -60,
              }}
            />

            <Typography
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              sx={{
                fontSize: { xs: 28, md: 40 },
                color: "#fff",
                mb: 2,
                letterSpacing: "-0.02em",
                position: "relative",
              }}
            >
              Ready to get started?
            </Typography>
            <Typography
              fontFamily="Inter, sans-serif"
              sx={{
                fontSize: { xs: 15, md: 18 },
                color: "rgba(255,255,255,0.8)",
                mb: 4,
                position: "relative",
              }}
            >
              Create your free account and start organising your ideas today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/signup")}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#7C3AED",
                borderRadius: "12px",
                px: 4,
                py: 1.5,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                position: "relative",
                "&:hover": {
                  backgroundColor: "#F5F3FF",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Create free account
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* ── Footer ── */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid #E5E7EB",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography
          fontFamily="Inter, sans-serif"
          fontSize={13}
          sx={{ color: "#9CA3AF" }}
        >
          © {new Date().getFullYear()} Notes · Built with ♥
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
