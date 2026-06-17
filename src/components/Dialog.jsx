import * as React from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { token } from "../utils/getToken";

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

export default function FormDialog({ type, setRerender, projectId = "" }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isFolder = type === "folder";

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("textfieldname");
    setLoading(true);

    try {
      if (isFolder) {
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/projects`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token()}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/files`,
          { name, projectId },
          {
            headers: {
              Authorization: `Bearer ${token()}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      setRerender((old) => !old);
      handleClose();
    } catch (error) {
      console.error("Error creating resource:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={isFolder ? "New folder" : "New file"}>
        <IconButton
          onClick={handleClickOpen}
          size="small"
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#fff",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.32)" },
            transition: "background 0.2s",
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          sx: {
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            p: 1,
            minWidth: { xs: "90vw", sm: 420 },
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pb: 1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#0F0A1E",
          }}
        >
          {isFolder ? (
            <FolderOutlinedIcon sx={{ color: "#7C3AED", fontSize: 22 }} />
          ) : (
            <NoteAddOutlinedIcon sx={{ color: "#7C3AED", fontSize: 22 }} />
          )}
          {isFolder ? "New Folder" : "New File"}
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ ml: "auto", color: "#9CA3AF" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1, pb: 2 }}>
          <Typography
            fontFamily="Inter, sans-serif"
            fontSize={14}
            color="#6B7280"
            sx={{ mb: 2.5 }}
          >
            {isFolder
              ? "Give your folder a name to keep your notes organised."
              : "Give your file a name to get started."}
          </Typography>
          <TextField
            autoFocus
            name="textfieldname"
            label={isFolder ? "Folder name" : "File name"}
            type="text"
            fullWidth
            variant="outlined"
            required
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isFolder ? (
                    <FolderOutlinedIcon sx={{ color: "#C4B5FD", fontSize: 18 }} />
                  ) : (
                    <NoteAddOutlinedIcon sx={{ color: "#C4B5FD", fontSize: 18 }} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={handleClose}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: 14,
              textTransform: "none",
              color: "#6B7280",
              borderRadius: "10px",
              px: 2.5,
              "&:hover": { backgroundColor: "#F3F4F6" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#7C3AED",
              borderRadius: "10px",
              px: 3,
              boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
              "&:hover": {
                backgroundColor: "#6D28D9",
                boxShadow: "0 6px 16px rgba(124,58,237,0.45)",
              },
              "&:disabled": { backgroundColor: "#C4B5FD", color: "#fff" },
              transition: "all 0.2s ease",
            }}
          >
            {loading ? "Creating…" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
