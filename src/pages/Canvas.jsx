import { Box, Paper, Typography } from "@mui/material";
import ExcalidrawComponent from "../components/ExcalidrawComponent";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BasicMenu from "../components/Popup";

function Canvas() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{ height: "100vh", width: "100vw" }}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Paper
        m={0}
        elevation={2}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0px",
          padding: "10px 10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          maxWidth={"xl"}
        >
          <Box sx={{cursor:"pointer"}} onClick={()=>navigate(-1)} display={"flex"} alignItems={"center"}>
            <ArrowBack sx={{ fontSize: "25px" }} />
            <Typography
              fontWeight={600}
              fontFamily={"Caveat, cursive"}
              variant="h6"
              color="initial"
            >
              Back
            </Typography>
          </Box>
          <Box>
            <BasicMenu/>
          </Box>
        </Box>
      </Paper>
      <ExcalidrawComponent />
    </Box>
  );
}

export default Canvas;
