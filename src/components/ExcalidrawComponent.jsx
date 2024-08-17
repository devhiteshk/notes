import { useState, useRef } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { Box, Button, IconButton, Paper, Tooltip } from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const ExcalidrawComponent = () => {
  const excalidrawRef = useRef(null);
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Tooltip title={theme === "light" ? "Dark Mode" : "Light Mode"}>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 22,
            right: 30,
            zIndex: 4,
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: theme === "light" ? "#fff" : "#232329",
          }}
          onClick={handleThemeChange}
        >
          <Box
            sx={{ padding: 0, margin: 0 }}
            color={theme === "light" ? "#000" : "#fff"}
            http:aria-label="toggle theme"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {theme === "light" ? (
              <ModeNightIcon fontSize="10px" />
            ) : (
              <WbSunnyIcon fontSize="10px" />
            )}
          </Box>
        </Paper>
      </Tooltip>
      <Excalidraw ref={excalidrawRef} theme={theme} />
    </div>
  );
};

export default ExcalidrawComponent;
