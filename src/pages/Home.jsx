import { Box, Button, Typography, Zoom } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "./../assets/diary-journal-color-icon.svg";

function Home() {
  const navigate = useNavigate();
  return (
    <Box className="Home">
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        padding={"20px 20px"}
        gap={"20px"}
        alignItems={"center"}
      >
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/signup")}>Sign up</Button>
      </Box>
      <Zoom
        style={{ transitionDelay: "500ms", transitionDuration: "0.6s" }}
        in={true}
        mt="4rem"
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={"30px"} alignItems={"flex-end"}>
            <Box>
              <Typography
                fontFamily={"Caveat, cursive"}
                variant="h3"
                fontWeight={500}
              >
                Your
              </Typography>
              <img width={"150rem"} src={image} alt="notebook" />
            </Box>
            <Typography
              pb={1}
              fontFamily={"Caveat, cursive"}
              variant="h1"
              fontSize={"8rem"}
              fontWeight={500}
            >
              Notes
            </Typography>
          </Box>
        </Box>
      </Zoom>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
        justifyContent={"center"}
        mt={"4rem"}
      >
        <Zoom
          style={{ transitionDelay: "1200ms", transitionDuration: "0.6s" }}
          in={true}
        >
          <Typography
            textAlign={"center"}
            fontFamily={"Caveat, cursive"}
            variant="h3"
            color="initial"
          >
            Unleash Your Ideas on a Canvas 🚀
          </Typography>
        </Zoom>
        <Zoom
          style={{ transitionDelay: "1800ms", transitionDuration: "0.6s" }}
          in={true}
        >
          <Typography
            textAlign={"center"}
            fontFamily={"Caveat, cursive"}
            variant="h4"
            color="initial"
          >
            Take notes, draw diagrams, and explain your concepts effortlessly 💪
          </Typography>
        </Zoom>
        <Box textAlign={"center"} mt={3}>
          <Zoom
            style={{ transitionDelay: "2600ms", transitionDuration: "0.6s" }}
            in={true}
          >
            <Button
              onClick={() => navigate("/login")}
              sx={{
                padding: "16px 48px",
                fontFamily: "Caveat, cursive",
                fontWeight: "bold",
                fontSize: 22,
                backgroundColor: "#6A1B9A",
                ":hover": { backgroundColor: "#AB47BC" },
                borderRadius: "100px",
              }}
              variant="contained"
            >
              Start Creating
            </Button>
          </Zoom>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
