import React from 'react'
import ButtonIcon from '../assete/button-icon-text-shrunk (2).svg'
import ButtonIconRight from '../assete/button-icon-text-shrunk (3).svg'

const Landing = () => {
  const handleDiscoverClick = () => {
    // Add your discover functionality here
    console.log('Discover button clicked!');
    // Example: navigate to discover page, show modal, etc.
  };

  return (
    <div className='container'>
      <div className="left_box">
        <button className='discover_btn' onClick={handleDiscoverClick}>
          <img src={ButtonIcon} alt="Left pointing button" />
        </button>
      </div>
        <p className='para-1'>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.</p>
      <div className="middle_box">
        <h1 className='main_txt'>
          Sophisticated skincare
        </h1>
      </div>
      <div className="right_box">
        <button className='take_test-btn'>
          <img src={ButtonIconRight} alt="Right pointing button" />
        </button>
      </div>
    </div>
  )
}

export default Landing