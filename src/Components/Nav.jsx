import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function Nav() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <nav>
      <IconButton onClick={handleClick}>
        <HomeIcon />
      </IconButton>
    </nav>
  );
}

export default Nav;
