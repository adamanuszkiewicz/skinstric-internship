import React from 'react'
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";

const BackButton = ({ navigateTo = '/' }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log("Back button clicked, navigating to:", navigateTo);
    navigate(navigateTo);
  };

  return (
    <>
      <div className="back_btn-container">
        <button className="back_btn" onClick={handleBackClick}>
          <img
            className="play-btn-logo-3"
            src={PlayBtnLogo}
            alt="Play button logo"
          />
        </button>
        <p className="back_btn-txt" onClick={handleBackClick}>BACK</p>
        
      </div>
    </>
  )
}

export default BackButton