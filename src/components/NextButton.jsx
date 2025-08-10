import React from 'react'
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";

function NextButton({ navigateTo = '/results' }) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    console.log("Next button clicked, navigating to:", navigateTo);
    navigate(navigateTo);
  };

  return (
    <>
      <div className="next_btn-container">
      <button className="next_btn" onClick={handleNextClick}>
        <img
          className="play-btn-logo-2"
          src={PlayBtnLogo}
          alt="Play button logo"
        />
      </button>
      <p className="next_btn-txt"  onClick={handleNextClick}>PROCEED</p>
      </div>
    </>
  )
}

export default NextButton