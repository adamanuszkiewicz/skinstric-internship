import React from "react";
import { useNavigate } from "react-router-dom";
import Rectangle2710 from "../assete/Rectangle 2710.svg";
import Rectangle2711 from "../assete/Rectangle 2711.svg";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__row">
          <button className="skin_btn" onClick={handleLogoClick}>skinstric
          </button>
          <div className="intro">
            <img className="l-rec" src={Rectangle2710} alt="Rectangle 2710" />
            <h1 className="intro_txt">INTRO</h1>
            <img className="r-rec" src={Rectangle2711} alt="Rectangle 2711" />
          </div>
        </div>
          <button className="code_btn">ENTER CODE</button>
      </div>
    </nav>
  );
};

export default Nav;
