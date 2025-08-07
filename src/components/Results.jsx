import React from 'react'
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import CameraIcon from "../assete/camera-icon.webp";
import GalleryIcon from "../assete/gallery-icon.webp";




const Results = () => {
  return (
    <div className="results_container">
      <p className='results_intro'>To start analysis

</p>
      <div className="results_row">
        <div className="camra_container">
          <div className="test_box-4"></div>
          <div className="test_box-5"></div>
          <div className="test_box-6">
             <img className="camera-icon" src={CameraIcon} alt="Camera icon" />
          </div>
        </div>
        <div className="photo_container">
          <div className="test_box-7"></div>
          <div className="test_box-8"></div>
          <div className="test_box-9">
            <img className="gallery-icon" src={GalleryIcon} alt="" />
          </div>
        </div>
        <div className="preview_container">
          <p className='prev_para'>Preview</p>
          <div className="small_box">
          </div>
        </div>
      </div>
      <div className="btns_container">
        <BackButton navigateTo="/testing" />
        <NextButton navigateTo="/select" />
      </div>
    </div>
  )
}

export default Results