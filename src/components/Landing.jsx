import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../assete/button-icon-text-shrunk (2).svg'
import ButtonIconRight from '../assete/button-icon-text-shrunk (3).svg'
import PlayBtnLogo from '../assete/play-btn-logo.png'

const Landing = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    console.log('Discover button clicked')
  };

  const handleTakeTestClick = () => {
    console.log('Take test button clicked');
    navigate('/testing');
  };

  const handleExperienceClick = () => {
    console.log('Experience button clicked');
    navigate('/testing')
  }

  return (
    <div className='container'>
      <div className="left_box">
        <button className='discover_btn' onClick={handleDiscoverClick}>
          <img className='lp-btn' src={ButtonIcon} alt="Left pointing button" />
        </button>
      </div>
        <p className='para-1'>Skinstric developed an A.I that creates a highly-personalized routine tailored to what your skin needs.</p>
      <div className="middle_box">
        <h1 className='main_txt'>
          Sophisticated skincare
        </h1>
      </div>
      <div className="right_box">
        <button className='take_test-btn' onClick={handleTakeTestClick}>
          <img className='rp-btn' src={ButtonIconRight} alt="Right pointing button" />
        </button>
      </div>
      <div className="exp_btn">
        <span className='exp_btn-txt'>ENTER EXPERIENCE</span>
        <button className='experience_btn' onClick={handleExperienceClick}>
          <img className='play-btn-logo' src={PlayBtnLogo} alt="Play button logo" />
        </button>
      </div>
    </div>
  )
}

export default Landing