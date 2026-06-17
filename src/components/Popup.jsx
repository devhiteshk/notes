import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Divider, ListItemIcon, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Avatar
        id="user-avatar-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: 30,
          height: 30,
          cursor: "pointer",
          backgroundColor: "#7C3AED",
          fontSize: 15,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(124,58,237,0.35)",
          transition: "box-shadow 0.2s",
          "&:hover": { boxShadow: "0 4px 14px rgba(124,58,237,0.5)" },
        }}
      />

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "user-avatar-button" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: "14px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            overflow: "visible",
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -6,
              right: 14,
              width: 12,
              height: 12,
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderBottom: "none",
              borderRight: "none",
              transform: "rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            color: "#EF4444",
            borderRadius: "8px",
            mx: 0.5,
            "&:hover": { backgroundColor: "#FEF2F2" },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "#EF4444" }} />
          </ListItemIcon>
          <Typography fontFamily="Inter, sans-serif" fontSize={14} color="#EF4444">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
