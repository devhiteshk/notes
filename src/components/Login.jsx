import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import image from "./../assets/notesSBG.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { overrides } from "../overrides";

function Copyright() {
  return (
    <Typography
      fontFamily="Caveat, cursive"
      variant="body1"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link
        fontFamily="Caveat, cursive"
        color="inherit"
        href="https://codehoody.com/"
      >
        CodeHoody
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const data = await response.data;

      if (response.status === 200) {
        window.localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Grid container component="main" height="100vh">
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#d5d5d5",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 2,
          }}
        >
          <Avatar
            sx={{ backgroundColor: "#a163ed", width: "63px", height: "63px" }}
          >
            <LockOpenIcon sx={{ fontSize: "32px" }} />
          </Avatar>
          <Typography fontFamily="Caveat, cursive" component="h1" variant="h4">
            {"Let's Login"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            p={{ xs: "0px 20px", md: "0px 35px", lg: "0px 40px" }}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              sx={overrides}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              sx={overrides}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                marginTop: 3,
                padding: "14px 24px",
                fontFamily: "Caveat, cursive",
                fontWeight: "bold",
                fontSize: 18,
                backgroundColor: "#6A1B9A",
                ":hover": { backgroundColor: "#AB47BC" },
                borderRadius: "5px",
              }}
            >
              Sign In
            </Button>
            <Grid container mt={1}>
              <Grid item xs>
                {/* <Link
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  color={"#000"}
                  fontFamily="Caveat, cursive"
                  href="#"
                  variant="body2"
                  fontSize={16}
                >
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  color={"#000"}
                  fontFamily="Caveat, cursive"
                  onClick={() => navigate("/signup")}
                  variant="body2"
                  fontSize={16}
                >
                  {"No account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
