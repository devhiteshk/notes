/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from "@mui/material";
import BasicMenu from "./Popup";

function Layout({ children }) {
  return (
    <Box className="Dashboard" sx={{ minHeight: "100vh", width: '100vw' }} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Paper m={0} elevation={2} sx={{ backgroundColor: "#fff", borderRadius: "0px", padding: "10px 10px", width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }} maxWidth={"xl"}>
          <Box><Typography fontWeight={600} fontFamily={"Caveat, cursive"} variant="h4" color="initial">📝Notes </Typography></Box>
          <Box>
            <BasicMenu/>
          </Box>
        </Box>
      </Paper>
      {children}
    </Box>
  );
}

export default Layout;
