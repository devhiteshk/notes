import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Skeleton,
} from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Layout from "./Layout";
import FormDialog from "./Dialog";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "../utils/getToken";

// ─── empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onNew, setRerender }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          py: 14,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "24px",
            backgroundColor: "#F3EEFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <FolderOutlinedIcon sx={{ fontSize: 40, color: "#A78BFA" }} />
        </Box>
        <Typography
          fontFamily="Poppins, sans-serif"
          fontWeight={700}
          fontSize={20}
          color="#1F2937"
        >
          No folders yet
        </Typography>
        <Typography
          fontFamily="Inter, sans-serif"
          fontSize={14}
          color="#9CA3AF"
          textAlign="center"
          maxWidth={280}
          lineHeight={1.6}
        >
          Create your first folder to start organising your notes and canvases.
        </Typography>
      </Box>
    </motion.div>
  );
}

// ─── skeleton cards ───────────────────────────────────────────────────────────
function SkeletonCards() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton
          key={i}
          variant="rounded"
          sx={{
            width: { xs: "100%", sm: 260, md: 280 },
            height: 96,
            borderRadius: "20px",
            flexShrink: 0,
          }}
        />
      ))}
    </>
  );
}

// ─── folder card ──────────────────────────────────────────────────────────────
const FOLDER_COLORS = [
  { bg: "#F3EEFF", icon: "#A78BFA", hover: "#EDE9FE", hoverIcon: "#7C3AED", shadow: "rgba(124,58,237,0.15)" },
  { bg: "#EFF6FF", icon: "#93C5FD", hover: "#DBEAFE", hoverIcon: "#3B82F6", shadow: "rgba(59,130,246,0.15)" },
  { bg: "#F0FDF4", icon: "#86EFAC", hover: "#DCFCE7", hoverIcon: "#22C55E", shadow: "rgba(34,197,94,0.15)"  },
  { bg: "#FFF7ED", icon: "#FCD34D", hover: "#FEF3C7", hoverIcon: "#F59E0B", shadow: "rgba(245,158,11,0.15)" },
  { bg: "#FFF1F2", icon: "#FDA4AF", hover: "#FFE4E6", hoverIcon: "#F43F5E", shadow: "rgba(244,63,94,0.15)"  },
  { bg: "#F0FDFA", icon: "#5EEAD4", hover: "#CCFBF1", hoverIcon: "#14B8A6", shadow: "rgba(20,184,166,0.15)" },
];

function FolderCard({ item, onDelete, onClick, colorIndex }) {
  const [hovered, setHovered] = useState(false);
  const c = FOLDER_COLORS[colorIndex % FOLDER_COLORS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      style={{ flexShrink: 0 }}
    >
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 260, md: 280 },
        }}
      >
        {/* Delete */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.15 }}
              style={{ position: "absolute", top: -10, right: -10, zIndex: 3 }}
            >
              <Tooltip title="Delete folder" placement="top">
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
                  sx={{
                    backgroundColor: "#fff",
                    border: "1.5px solid #FECACA",
                    color: "#EF4444",
                    width: 30,
                    height: 30,
                    boxShadow: "0 2px 10px rgba(239,68,68,0.2)",
                    "&:hover": { backgroundColor: "#FEF2F2", borderColor: "#EF4444" },
                  }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card */}
        <Box
          onClick={onClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: "18px 20px",
            borderRadius: "20px",
            border: "1.5px solid",
            borderColor: hovered ? c.hoverIcon + "55" : "#E9EAEC",
            backgroundColor: hovered ? c.hover : "#fff",
            cursor: "pointer",
            boxShadow: hovered
              ? `0 10px 30px ${c.shadow}`
              : "0 2px 8px rgba(0,0,0,0.05)",
            transition: "all 0.22s ease",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              backgroundColor: hovered ? c.bg : c.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.22s",
            }}
          >
            <FolderIcon
              sx={{
                fontSize: 26,
                color: hovered ? c.hoverIcon : c.icon,
                transition: "color 0.22s",
              }}
            />
          </Box>

          {/* Text */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              fontFamily="Inter, sans-serif"
              fontWeight={600}
              fontSize={14}
              color="#111827"
              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", mb: 0.25 }}
            >
              {item.name}
            </Typography>
            <Typography
              fontFamily="Inter, sans-serif"
              fontSize={12}
              color="#9CA3AF"
            >
              Folder
            </Typography>
          </Box>

          {/* Arrow */}
          <ChevronRightIcon
            sx={{
              fontSize: 18,
              color: hovered ? c.hoverIcon : "#D1D5DB",
              transition: "color 0.22s, transform 0.22s",
              transform: hovered ? "translateX(2px)" : "translateX(0)",
              flexShrink: 0,
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
function DashboardC() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/projects`,
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      if (response.status === 200) setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/projects/${id}`,
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      if (response.status === 200) getProjects();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, [rerender]);

  return (
    <Layout>
      <Box
        sx={{
          px: { xs: 3, sm: 4, md: 6 },
          pt: 5,
          pb: 10,
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
        }}
      >
        {/* ── Hero banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box
            sx={{
              mb: 6,
              p: { xs: "22px 20px", md: "36px 40px" },
              borderRadius: "24px",
              background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 60%, #C084FC 100%)",
              boxShadow: "0 12px 40px rgba(124,58,237,0.25)",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: { xs: 3, sm: 2 },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <Box sx={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", border: "50px solid rgba(255,255,255,0.07)", top: -80, right: 60 }} />
            <Box sx={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", border: "36px solid rgba(255,255,255,0.06)", bottom: -60, right: -30 }} />

            <Box sx={{ position: "relative" }}>
              <Typography
                fontFamily="Poppins, sans-serif"
                fontWeight={700}
                sx={{ fontSize: { xs: 22, md: 28 }, color: "#fff", mb: 0.5 }}
              >
                My Workspace
              </Typography>
              <Typography
                fontFamily="Inter, sans-serif"
                sx={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}
              >
                {loading
                  ? "Loading your folders…"
                  : `${data.length} folder${data.length !== 1 ? "s" : ""} · organise your notes below`}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.25)",
                px: 2,
                py: 1,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Typography
                fontFamily="Inter, sans-serif"
                fontWeight={600}
                fontSize={14}
                color="#fff"
              >
                New Folder
              </Typography>
              <FormDialog type="folder" setRerender={setRerender} />
            </Box>
          </Box>
        </motion.div>

        {/* ── Section label ── */}
        {!loading && data.length > 0 && (
          <Typography
            fontFamily="Inter, sans-serif"
            fontWeight={600}
            fontSize={12}
            letterSpacing="0.07em"
            sx={{ color: "#9CA3AF", textTransform: "uppercase", mb: 3 }}
          >
            All Folders · {data.length}
          </Typography>
        )}

        {/* ── Grid ── */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
            alignItems: "flex-start",
          }}
        >
          {loading ? (
            <SkeletonCards />
          ) : data.length === 0 ? (
            <EmptyState setRerender={setRerender} />
          ) : (
            <AnimatePresence>
              {data.map((item, i) => (
                <FolderCard
                  key={item._id}
                  item={item}
                  colorIndex={i}
                  onDelete={handleDelete}
                  onClick={() => navigate(`/folder/${item._id}`)}
                />
              ))}
            </AnimatePresence>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export default DashboardC;
