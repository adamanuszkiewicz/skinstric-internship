import React from 'react'
import { useNavigate } from "react-router-dom";
import BackButton from './BackButton'
import NextButton from './NextButton'

const Summary = () => {
  return (
    <div className='summary_container'>
      <div className="summary_header-container">
        <h2 className='header_intro'>A.I Analysis</h2>
        <h3 className='dem_txt'>Demographics</h3>
        <h4 className='pred_txt'>Predicted race & age</h4>
      </div>
      <div className="dem_container">
        <div className="pred_row">
          <div className="pred_race">
            <h2 className='race'></h2>
            <p>RACE</p>
          </div>
          <div className="pred_age">
            <h2 className='age'></h2>
            <p className='age_txt'>AGE</p>
          </div>
          <div className="pred_sex">
            <h2 className='sex'></h2>
            <p className='sex_txt'>SEX</p>
          </div>
        </div>
        <div className="graph_container">
          <p className='race_txt'>Latino</p>
        </div>
        <div className="race_container">

        </div>
      </div>
      <div className="btns_container">
        <BackButton navigateTo="/select" />
        <NextButton navigateTo="/dashboard" />
      </div>
    </div>
  )
}

export default Summary