import { Box, Typography, Divider, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "./../assets/diary-journal-color-icon.svg";

const LAST_UPDATED = "July 19, 2026";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: `Notes ("we", "our") is a personal productivity app for writing notes, sketching on canvases, and organising ideas in folders. This Privacy Policy explains what data we collect, why we collect it, and how we protect it. We keep our data footprint as small as possible.`,
  },
  {
    id: "data-collected",
    title: "Data We Collect",
    content: null,
    list: [
      {
        label: "OAuth profile data",
        detail:
          "When you sign in with Google or GitHub, we receive your name and email address from the provider. We store this to identify your account. We do not receive or store your passwords from those providers.",
      },
      {
        label: "Notes and canvas content",
        detail:
          "The text, markdown, and Excalidraw canvas data you create is stored in our database so you can access it across devices.",
      },
      {
        label: "Folder / project names",
        detail: "Folder names you create are stored and associated with your account.",
      },
      {
        label: "JWT session token",
        detail:
          "A signed JSON Web Token is stored in your browser's localStorage to keep you signed in for 48 hours. It contains only your user ID and expiry.",
      },
    ],
  },
  {
    id: "data-not-collected",
    title: "What We Do Not Collect",
    content: null,
    list: [
      { label: "Passwords", detail: "We use OAuth only. No passwords are ever stored." },
      { label: "Payment information", detail: "Notes is free. No billing data is collected." },
      { label: "Tracking cookies", detail: "We do not use analytics or advertising cookies." },
      { label: "Third-party analytics", detail: "We do not send data to Google Analytics, Mixpanel, or similar services." },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Data",
    content: null,
    list: [
      { label: "Authenticating you", detail: "Your OAuth identity links your account to your notes." },
      { label: "Delivering the service", detail: "Saving and loading your notes, folders, and canvases." },
      { label: "AI assistant", detail: "When you use the AI chat feature, your message is sent to our AI backend. We do not store AI chat history." },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content:
      "We do not sell or share your personal data with advertisers or data brokers. Infrastructure providers (MongoDB Atlas, Vercel) process your data as part of delivering the service and are bound by their own privacy policies. OAuth providers (Google, GitHub) process your sign-in and are governed by their own privacy policies.",
  },
  {
    id: "security",
    title: "Security",
    content:
      "All connections are encrypted via HTTPS/TLS. JWTs are signed with a secret key and expire after 48 hours. The backend enforces rate limiting, CORS restrictions, and HTTP security headers via Helmet.js. Your content is stored in a private MongoDB database with access controls.",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content:
      "You may delete your account and all associated data at any time by contacting us. Upon request, we will permanently delete your notes, folders, and profile information from our database.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content:
      'We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision.',
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "For privacy questions, please open an issue on our GitHub repository.",
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }}>
      {/* Nav */}
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
          backgroundColor: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Box onClick={()=> navigate("/")} sx={{ display: "flex", alignItems: "center", gap: 1, cursor:"pointer" }}>
          <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
            <img src={image} width="100%" height="100%" alt="Notes logo" />
          </Box>
          <Typography fontFamily="Caveat, cursive" fontWeight={700} fontSize={24} sx={{ color: "#1a1a2e" }}>
            Notes <span style={{fontSize: 10}}> by HivarSoft </span>
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer", color: "#6B7280", "&:hover": { color: "#7C3AED" } }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} />
          <Typography fontFamily="Inter, sans-serif" fontSize={14} fontWeight={500}>
            Back
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Header */}
        <Box mb={6}>
          <Typography
            fontFamily="Poppins, sans-serif"
            fontWeight={700}
            sx={{ fontSize: { xs: 32, md: 44 }, color: "#0F0A1E", mb: 1.5, letterSpacing: "-0.02em" }}
          >
            Privacy Policy
          </Typography>
          <Typography fontFamily="Inter, sans-serif" fontSize={14} color="#9CA3AF">
            Last updated: {LAST_UPDATED}
          </Typography>
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* Sections */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sections.map((s) => (
            <Box key={s.id} id={s.id}>
              <Typography
                fontFamily="Poppins, sans-serif"
                fontWeight={600}
                fontSize={20}
                color="#111827"
                mb={2}
              >
                {s.title}
              </Typography>

              {s.content && (
                <Typography fontFamily="Inter, sans-serif" fontSize={15} color="#4B5563" lineHeight={1.85}>
                  {s.content}
                </Typography>
              )}

              {s.list && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {s.list.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        pl: 3,
                        borderLeft: "3px solid #DDD6FE",
                      }}
                    >
                      <Typography fontFamily="Inter, sans-serif" fontWeight={600} fontSize={14} color="#374151" mb={0.5}>
                        {item.label}
                      </Typography>
                      <Typography fontFamily="Inter, sans-serif" fontSize={14} color="#6B7280" lineHeight={1.75}>
                        {item.detail}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Footer links */}
        <Box sx={{ textAlign: "center" }}>
          <Typography fontFamily="Inter, sans-serif" fontSize={13} color="#9CA3AF">
            © {new Date().getFullYear()} Notes ·{" "}
            <a href="/privacy-policy" style={{ color: "#7C3AED", textDecoration: "none" }}>Privacy Policy</a>
            {" "}·{" "}
            <a href="/terms-of-service" style={{ color: "#7C3AED", textDecoration: "none" }}>Terms of Service</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
