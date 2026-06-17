import { Box, Typography } from "@mui/material";
import image from "./../assets/diary-journal-color-icon.svg";

import BasicMenu from "./Popup";

function Layout({ children }) {
  return (
    <Box
      className="Dashboard"
      sx={{ minHeight: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}
    >
      {/* ── Top nav ── */}
      <Box
        component="nav"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "xl",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 3, md: 5 },
            py: 1.5,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
                <img src={image} width="100%" height="100%" alt="Notes logo" />
            </Box>
            <Typography
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              fontSize={20}
              sx={{ color: "#0F0A1E", lineHeight: 1 }}
            >
              Notes
            </Typography>
          </Box>

          {/* User menu */}
          <BasicMenu />
        </Box>
      </Box>

      {/* ── Page content ── */}
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
}

export default Layout;
