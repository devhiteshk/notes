import { Box, Button } from "@mui/material";
import notfound from "./assets/notfound.svg";
import { Paper, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BasicMenu from "./components/Popup";

function Error404() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        gap: "40px",
      }}
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
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
            display={"flex"}
            alignItems={"center"}
          >
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
            <BasicMenu />
          </Box>
        </Box>
      </Paper>
      <Box sx={{ width: { xs: "280px", md: "350px", lg: "480px" }, mt:8 }}>
        <img src={notfound} width={"100%"} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: 3,
          padding: "10px 44px",
          fontFamily: "Caveat, cursive",
          fontWeight: "bold",
          fontSize: 18,
          backgroundColor: "#6A1B9A",
          ":hover": { backgroundColor: "#AB47BC" },
          borderRadius: "5px",
        }}
        onClick={() => navigate(-1)}
      >
        GO BACK
      </Button>
    </Box>
  );
}

export default Error404;
