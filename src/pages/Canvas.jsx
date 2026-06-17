import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ExcalidrawComponent from "../components/ExcalidrawComponent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import image from "./../assets/diary-journal-color-icon.svg";
import { useNavigate } from "react-router-dom";
import BasicMenu from "../components/Popup";

function Canvas() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      {/* ── Nav bar ── */}
      <Box
        component="nav"
        sx={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderBottom: "1px solid #E5E7EB",
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 3, md: 5 },
            py: 1,
          }}
        >
          {/* Back */}
          <Tooltip title="Back to folder">
            <Box
              onClick={() => navigate(-1)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                color: "#6B7280",
                "&:hover": { color: "#7C3AED" },
                transition: "color 0.2s",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                  color: "inherit",
                  "&:hover": {
                    borderColor: "#7C3AED",
                    backgroundColor: "#F3EEFF",
                  },
                  transition: "all 0.2s",
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography
                fontFamily="Inter, sans-serif"
                fontWeight={500}
                fontSize={14}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Back
              </Typography>
            </Box>
          </Tooltip>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 22, height: 22, flexShrink: 0 }}>
                        <img src={image} width="100%" height="100%" alt="Notes logo" />
                      </Box>
            <Typography
              fontFamily="Poppins, sans-serif"
              fontWeight={700}
              fontSize={18}
              sx={{ color: "#0F0A1E" }}
            >
              Notes
            </Typography>
          </Box>

          {/* User menu */}
          <BasicMenu />
        </Box>
      </Box>

      {/* ── Canvas ── */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <ExcalidrawComponent />
      </Box>
    </Box>
  );
}

export default Canvas;
