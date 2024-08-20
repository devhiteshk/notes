import { Box, Button, Typography, Zoom } from "@mui/material";
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
        <Button
          size="large"
          variant="text"
          sx={{
            fontFamily: "Caveat, cursive",
            fontWeight: "bold",
            backgroundColor: "#6A1B9A",
            ":hover": { backgroundColor: "#AB47BC" },
            color: "#fff",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{
            fontFamily: "Caveat, cursive",
            fontWeight: "bold",
            backgroundColor: "#6A1B9A",
            ":hover": { backgroundColor: "#AB47BC" },
            color: "#fff",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </Button>
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
          <Box
            display={"flex"}
            sx={{ gap: { xs: "10px", md: "20px", lg: "30px" } }}
            alignItems={"flex-end"}
          >
            <Box>
              <Typography
                fontFamily={"Caveat, cursive"}
                variant={"h3"}
                sx={{ fontSize: { xs: 18, md: 28, lg: 48 } }}
                fontWeight={500}
              >
                Your
              </Typography>
              <Box sx={{ width: { xs: 50, md: 100, lg: 120 } }}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src={image}
                  alt="notebook"
                />
              </Box>
            </Box>
            <Typography
              pb={1}
              fontFamily={"Caveat, cursive"}
              variant="h1"
              fontWeight={500}
              sx={{ fontSize: { xs: 48, md: 98, lg: 128 } }}
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
            sx={{ fontSize: { xs: 18, md: 28, lg: 48 } }}
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
            sx={{ fontSize: { xs: 16, md: 20, lg: 38 } }}
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
                padding: { xs: "8px 28px", md: "12px 38px", lg: "16px 48px" },
                fontFamily: "Caveat, cursive",
                fontWeight: "bold",
                fontSize: { xs: 18, md: 28, lg: 48 },
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
