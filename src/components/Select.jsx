import React from 'react'
import { useNavigate } from "react-router-dom";
import BackButton from './BackButton'
import NextButton from './NextButton'

const Select = () => {
  const navigate = useNavigate();

  const handleSelectBtn1Click = () => {
    navigate('/summary');
  };
  
  return (
    <div>
      <div className="select_header">
        <h1 className='select_intro'>A.I. Analysis</h1>
        <p className='select_para'>A.I. has estimated the following. <br/>Fix Estimated Information if needed.</p>
      </div>
      <div className="select_container">
        <button className='select_btn-1' onClick={handleSelectBtn1Click}><span className='select_rotate-txt'>Demographics</span></button>
        <button className='select_btn-2'><span className='select_rotate-txt'>Cosmetic Concerns</span></button>
        <button className='select_btn-3'><span className='select_rotate-txt'>Skin Type Details</span></button>
        <button className='select_btn-4'><span className='select_rotate-txt'>Weather</span></button>
      </div>
      <div className="btns_container">
        <NextButton className="summary_btn" navigateTo='/summary' />
        <p className='summary_btn-text'>Get Summary</p>
        <BackButton className="test_btn-next" navigateTo="/results"/>
      </div>
    </div>
  )
}

export default Select