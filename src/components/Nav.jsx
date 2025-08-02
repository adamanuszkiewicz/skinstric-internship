import React from 'react';
import SkinstricLogo from '../assete/Skinstric.svg';
import Rectangle2710 from '../assete/Rectangle 2710.svg';
import Rectangle2711 from '../assete/Rectangle 2711.svg';

const Nav = () => {
  return (
    <nav>
      <div className="nav__container">
        <img src={SkinstricLogo} alt="Skinstric Logo" />
        <div className="intro">
          <img src={Rectangle2710} alt="Rectangle 2710" />
          <h1>INTRO</h1>
          <img src={Rectangle2711} alt="Rectangle 2711" />
        </div>
        
      </div>
    </nav>
  )
}

export default Nav;