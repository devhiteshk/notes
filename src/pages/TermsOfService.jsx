import { Box, Typography, Divider, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "./../assets/diary-journal-color-icon.svg";

const LAST_UPDATED = "July 19, 2026";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content:
      "By creating an account or using the Notes app, you agree to these Terms of Service. If you do not agree, please do not use the service.",
  },
  {
    id: "description",
    title: "Service Description",
    content:
      "Notes is a free personal productivity application for writing notes, drawing on canvases, organising content in folders, and using an AI assistant. The service requires a GitHub or Google account to sign in.",
  },
  {
    id: "accounts",
    title: "Accounts & Authentication",
    content: null,
    list: [
      {
        label: "OAuth only",
        detail:
          "We use GitHub and Google OAuth exclusively. You must have a valid account with one of these providers to access Notes.",
      },
      {
        label: "One account per person",
        detail: "You may not share your account with others or create accounts on behalf of others without their consent.",
      },
      {
        label: "Account security",
        detail:
          "You are responsible for the security of your GitHub or Google account. Enable two-factor authentication on those accounts for best security.",
      },
    ],
  },
  {
    id: "your-content",
    title: "Your Content",
    content:
      "You retain full ownership of any notes, drawings, and content you create in Notes. By storing content in our service, you grant us a limited licence to store, display, and process that content solely to deliver the service to you. We do not use your content to train AI models.",
  },
  {
    id: "prohibited-use",
    title: "Prohibited Use",
    content: "You must not use Notes to:",
    list: [
      { label: "Store illegal content", detail: "Including but not limited to material that infringes copyright, constitutes harassment, or violates applicable laws." },
      { label: "Attempt to breach security", detail: "Including probing, scanning, or testing the vulnerability of our systems." },
      { label: "Automate abuse", detail: "Scripted or automated access beyond normal API use, or deliberate attempts to exceed rate limits." },
      { label: "Impersonate others", detail: "Creating content or activity that misrepresents your identity." },
    ],
  },
  {
    id: "ai-feature",
    title: "AI Assistant",
    content:
      "The AI assistant generates Excalidraw canvas elements based on your prompts. AI-generated content may be inaccurate, incomplete, or unexpected. Do not rely on AI output for critical decisions. We are not responsible for the accuracy of AI-generated content.",
  },
  {
    id: "availability",
    title: "Availability",
    content:
      "Notes is provided free of charge with no uptime guarantee. We may modify, suspend, or discontinue the service at any time without prior notice. We are not liable for any loss arising from service interruptions.",
  },
  {
    id: "termination",
    title: "Termination",
    content:
      "You may stop using Notes at any time. We reserve the right to suspend or terminate accounts that violate these Terms. Upon termination, you may request deletion of your data.",
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    content:
      'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.",
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content:
      'We may update these Terms at any time. The "Last updated" date reflects the most recent revision. Continued use of the service after changes are posted constitutes acceptance.',
  },
  {
    id: "contact",
    title: "Contact",
    content: "For questions about these Terms, please open an issue on our GitHub repository.",
  },
];

export default function TermsOfService() {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
            <img src={image} width="100%" height="100%" alt="Notes logo" />
          </Box>
          <Typography fontFamily="Caveat, cursive" fontWeight={700} fontSize={24} sx={{ color: "#1a1a2e" }}>
            Notes
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
            Terms of Service
          </Typography>
          <Typography fontFamily="Inter, sans-serif" fontSize={14} color="#9CA3AF">
            Last updated: {LAST_UPDATED}
          </Typography>
        </Box>

        <Alert
          severity="info"
          sx={{ mb: 6, borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: 14 }}
        >
          By using Notes, you agree to these terms. Please read them carefully.
        </Alert>

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
                <Typography fontFamily="Inter, sans-serif" fontSize={15} color="#4B5563" lineHeight={1.85} mb={s.list ? 2 : 0}>
                  {s.content}
                </Typography>
              )}

              {s.list && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {s.list.map((item) => (
                    <Box key={item.label} sx={{ pl: 3, borderLeft: "3px solid #DDD6FE" }}>
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
