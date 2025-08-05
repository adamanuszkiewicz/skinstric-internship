import React, { useState } from "react";
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";

const Testing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleBackClick = () => {
    console.log("Back button clicked");
    navigate("/");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setStep(2);
    }
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (formData.location.trim()) {
      try {
        const response = await fetch(
          `https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              location: formData.location,
            }),
          }
        );

        const result = await response.json();

        localStorage.setItem(
          "skinstricUserData",
          JSON.stringify({
            name: formData.name,
            location: formData.location,
            timestamp: new Date().toString(),
          })
        );

        console.log("Data saved successfully:", result);

        alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Error saving data. Please try again.");
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="test_container">
        <p className="start_txt">To start analysis</p>
      </div>
      <div className="main_testing-container">
        <div className="rotate_container">
          <div className="test_box-1"></div>
          <div className="test_box-2"></div>
          <div className="test_box-3"></div>
          <div className="form_container">
            {step === 1 ? (
              <form className="test_form" onSubmit={handleNameSubmit}>
                <p className="test_intro-para">Click to type</p>
                <input 
                  className="input_intro"
                  placeholder="Introduce Yourself"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  autoFocus  
                />
              </form>
            ) : (
              <form className="test_form" onSubmit={handleLocationSubmit}>
                                <p className="test_intro-para">Where are you from?</p>
                <input 
                  className="input_intro"
                  placeholder="your city name"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  autoFocus
                />
              </form>
            )}
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
