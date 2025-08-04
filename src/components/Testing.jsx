import React from "react";
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";

const Testing = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log('Back button clicked');
    navigate('/')
  };



  return (
    <>
      <div className="test_container">
        <p className="start_txt">To start analysis</p>
      </div>
      <div className="form_container">
            <form className="test_form" action="javascript:throw new Error('React form unexpectedly submitted.')">
              <p className="test_intro-para">Click to type</p>
              <input
                className="input_intro"
                placeholder="Introduce Yourself"
                type="text"
              />
            </form>

      </div>
      <div className="main_testing-container">
        <div className="rotate_container">
          <div className="test_box-1"></div>
          <div className="test_box-2"></div>
          <div className="test_box-3">
          </div>
        </div>
      </div>
      <button className="back_btn" onClick={handleBackClick}>
        <img
          className="play-btn-logo-2"
          src={PlayBtnLogo}
          alt="Play button logo"
        />
      </button>
      <p className="back_btn-txt">BACK</p>
    </>
  );
};

export default Testing;
