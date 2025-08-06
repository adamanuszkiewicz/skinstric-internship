import React from 'react'
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";



const Results = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    navigate("/results")
  };

  return (
    <div>
      <div className="results_container">
        <div className="results_row">
          <p className='results_intro'>To start analysis</p>
        </div>
        <div className="camra_container">
          <div className="rotate_container">
            <div className="test_box-1"></div>
            <div className="test_box-2"></div>
            <div className="test_box-3"></div>
          </div>
        </div>
        <div className="photo_container">
          <div className="rotate_container">
            <div className="test_box-1"></div>
            <div className="test_box-2"></div>
            <div className="test_box-3"></div>
          </div>
        </div>
      </div>
      <div className="btns_container">
        <button className="next_btn" onClick={handleNextClick}>
          <img
            className="play-btn-logo-2"
            src={PlayBtnLogo}
            alt="Play button logo"
          />
        </button>
        <p className="next_btn-txt">PROCEED</p>
      
        <button className="back_btn" onClick={handleBackClick}>
          <img
            className="play-btn-logo-3"
            src={PlayBtnLogo}
            alt="Play button logo"
          />
        </button>
        <p className="back_btn-txt">BACK</p>
        
      </div>
    </div>
  )
}

export default Results