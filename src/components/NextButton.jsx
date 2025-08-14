import React from 'react'
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate, useLocation } from "react-router-dom";

function NextButton({ navigateTo = '/results' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNextClick = () => {
    console.log("Next button clicked, navigating to:", navigateTo);
    navigate(navigateTo);
  };

  const isSelectPage = location.pathname === '/select';
  const isSummaryPage = location.pathname === '/summary';

  return (
    <>
      <div className="next_btn-container">
      <button className="next_btn" onClick={handleNextClick}>
        <img
          className={`play-btn-logo-2 ${isSelectPage ? 'select-page-logo' : ''}`}
          src={PlayBtnLogo}
          alt="Play button logo"
        />
        {isSelectPage && (
          <span className="summary_btn-txt" onClick={handleNextClick}>SUM</span>
        )}
      </button>
      {!isSelectPage && (
        <>
          {isSummaryPage ? (
            <>
              <p className="next_btn-txt-3" onClick={handleNextClick}>HOME</p>
              <p className="next_btn-txt-3" onClick={handleNextClick}>HOME</p>
            </>
          ) : (
            <>
              <p className="next_btn-txt" onClick={handleNextClick}>PROCEED</p>
              <p className="next_btn-txt-2" onClick={handleNextClick}>PROCEED</p>
            </>
          )}
        </>
      )}
      </div>
    </>
  )
}

export default NextButton