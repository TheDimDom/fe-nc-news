import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import ToggleDarkModeButton from "./ToggleDarkModeButton";

function Header() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      py={3}
      style={{ textAlign: "center" }}
      backgroundColor="#D6D6D6"
    >
      <Box display="flex" alignItems="center" style={{ display: "flex", paddingBottom: 5 }}>
        <img
          src="https://images.crunchbase.com/image/upload/c_lpad,h_50,w_50,f_auto,q_auto:eco,dpr_1/ulotzh9rggc0yuk5wjae"
          alt="Northcoders News Logo"
          style={{ marginRight: "16px" }}
        />
        <Typography variant="h4" color="red">
          Welcome to Northcoders News!
        </Typography>
        <Box display="flex" alignItems="right">
          <ToggleDarkModeButton/>
        </Box>
      </Box>
    </Grid>
  );
}

export default Header;
