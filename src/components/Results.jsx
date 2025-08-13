import React, { useState, useRef } from 'react'
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import CameraIcon from "../assete/camera-icon.webp";
import GalleryIcon from "../assete/gallery-icon.webp";
import ResScanLine from "../assete/ResScanLine.webp"
import PlayBtnLogo from "../assete/play-btn-logo.png";

const Results = () => {
  const [selectedOption, setSelectedOption] = useState(null); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionSuccess, setSubmissionSuccess] = useState(false);
  const [isSubmissionError, setSubmissionError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCameraClick = async () => {
    setSelectedOption('camera');
    setIsCapturing(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
      setIsCapturing(false);
    }
  };

  const handlePhotoClick = () => {
    setSelectedOption('photo');
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      
      context.drawImage(videoRef.current, 0, 0);
      
      const imageData = canvas.toDataURL('image/png');
      console.log('Captured image data URL length:', imageData.length);
      setCapturedImage(imageData);
      
      // Stop the camera stream.
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCapturing(false);
    }
  };

  const resetSelection = () => {
    setSelectedOption(null);
    setCapturedImage(null);
    setIsCapturing(false);
    setSubmissionError(null);
    
    // Stops the camera stream if active.
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const submitPhoto = async () => {
    if (!capturedImage) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      console.log('Captured image type:', typeof capturedImage);
      console.log('Captured image starts with:', capturedImage.substring(0, 50));
      
      const userData = JSON.parse(localStorage.getItem('skinstricUserData') || '{}');

      // Extract base64 data from data URL (remove "data:image/png;base64," prefix)
      const base64Data = capturedImage.split(',')[1];
      console.log('Base64 data length:', base64Data.length);

      // Create JSON payload instead of FormData
      const payload = {
        image: base64Data,
        name: userData.name || '',
        location: userData.location || ''
      };

      console.log('Payload:', {
        image: base64Data.substring(0, 50) + '...(truncated)',
        name: payload.name,
        location: payload.location
      });

      const apiResponse = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }
      );
      const result = await apiResponse.json();
      
      console.log('API Response:', result); // Log the response for debugging
      console.log('API Response success:', result.success); // Log the success status
      console.log('API Response success type:', typeof result.success); // Log the type

      // Check if API response indicates success (handle multiple possible indicators)
      const isSuccess = result.success === true || 
                       result.success === 'true' || 
                       result.Success === true || 
                       result.Success === 'true' ||
                       (result.message && !result.message.toLowerCase().includes('error')) ||
                       (!result.success && !result.error && result.data); // Sometimes success isn't explicitly stated

      if (!isSuccess && (result.success === false || result.success === 'false' || result.error)) {
        console.error('API Error:', result.message || result.error || 'Unknown error');
        throw new Error(result.message || result.error || 'API request failed');
      }

      localStorage.setItem('skinstricAnalysisResult', JSON.stringify(result));
      console.log('Setting submission success to true'); // Debug log
      setSubmissionSuccess(true);
      setIsSubmitting(false);

    } catch (error) {
      console.log('Error submitting photo. Please try again.');
      setSubmissionError('Failed to submit photo. Please try again');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="results_container">
      <p className='results_intro'>To start analysis</p>
      <div className="results_row">
        <div className="camra_container" onClick={handleCameraClick}>
          <div className="test_box-4"></div>
          <div className="test_box-5"></div>
          <div className="test_box-6">
             <img className="camera-icon" src={CameraIcon} alt="Camera icon" />
          </div>
            <p className='ai_access-camera-txt'>allow a.i.<br/> to scan your face</p>
            <img className='res_scan-line-1' src={ResScanLine} alt="" />
        </div>
        <div className="photo_container" onClick={handlePhotoClick}>
          <div className="test_box-7"></div>
          <div className="test_box-8"></div>
          <div className="test_box-9">
            <img className="gallery-icon" src={GalleryIcon} alt="Gallery icon" />
          </div>
            <p className='ai_access-gallery-txt'>allow a.i.<br/>access gallery</p>
            <img className='res_scan-line-2' src={ResScanLine} alt="" />
        </div>
        <div className="preview_container">
          <p className='prev_para'>Preview</p>
          <div className="small_box">
            {capturedImage && (
              <img 
                src={capturedImage} 
                alt="Captured" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      </div>

      {isCapturing && (
        <div className="camera_interface" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <video 
            ref={videoRef} 
            style={{ maxWidth: '80%', maxHeight: '60%', marginBottom: '20px' }}
          />
          <div>
            <button 
              onClick={capturePhoto}
              style={{ 
                padding: '10px 20px', 
                marginRight: '10px',
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Capture Photo
            </button>
            <button 
              onClick={resetSelection}
              style={{ 
                padding: '10px 20px',
                backgroundColor: '#ccc',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <div className="btns_container">
        <BackButton navigateTo="/testing" />
        {(selectedOption && capturedImage && !isSubmitting && !isSubmissionSuccess) && (
          <div className="next_btn-container">
            <button 
              className="next_btn" 
              onClick={submitPhoto}
            >
              <img
                className="play-btn-logo-2"
                src={PlayBtnLogo}
                alt="Submit button logo"
              />
            </button>
            <p className="next_btn-txt-1" onClick={submitPhoto}>SUBMIT</p>
          </div>
        )}
        {isSubmitting && (
          <div className="next_btn-container">
            <button 
              className="next_btn" 
              disabled
              style={{ opacity: 0.6 }}
            >
              <img
                className="play-btn-logo-2"
                src={PlayBtnLogo}
                alt="Submit button logo"
              />
            </button>
            <p className="next_btn-txt-1">SUBMITTING...</p>
          </div>
        )}
        {isSubmissionSuccess && (
          <NextButton navigateTo="/select" />
        )}
      </div>
    </div>
  )
}

export default Results