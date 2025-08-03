import React from "react";
import SkinstricLogo from "../assete/Skinstric.svg";
import Rectangle2710 from "../assete/Rectangle 2710.svg";
import Rectangle2711 from "../assete/Rectangle 2711.svg";

const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <div className="nav__row">
          <img className="logo" src={SkinstricLogo} alt="Skinstric Logo" />
          <div className="intro">
            <img src={Rectangle2710} alt="Rectangle 2710" />
            <h1 className="intro_txt">INTRO</h1>
            <img src={Rectangle2711} alt="Rectangle 2711" />
          </div>
        </div>
          <button className="code_btn">ENTER CODE</button>
      </div>
    </nav>
  );
};

export default Nav;
