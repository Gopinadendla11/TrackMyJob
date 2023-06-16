import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar = (props) => {
  return (
    <div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <MenuIcon></MenuIcon>
      </button>
    </div>
  );
};
