import React from "react";
import Btn from "./Button";

const NavBar = () => {
  return (
    <nav>
      <h3 className="logo">Le Santos Diner</h3>

      <ul>
        <li>Home</li>
        <li>Recipes</li>
        <li>Blog</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <Btn textColor="#1b1b18" bgColor="transparent" border="1px solid #1b1b18">
        Reserve
      </Btn>
    </nav>
  );
};

export default NavBar;
