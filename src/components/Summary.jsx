import React from 'react'
import { useNavigate } from "react-router-dom";
import BackButton from './BackButton'
import NextButton from './NextButton'

const Summary = () => {
  return (
    <div>
      <h1>Summary</h1>
      <div className="btns_container">
        <BackButton navigateTo="/select" />
        <NextButton navigateTo="/dashboard" />
      </div>
    </div>
  )
}

export default Summary