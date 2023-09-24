import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";

function Nav() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <HomeIcon />
      </IconButton>
    </Box>
  );
}

export default Nav;
