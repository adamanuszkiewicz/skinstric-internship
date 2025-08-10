import React, { useState } from "react";
import PlayBtnLogo from "../assete/play-btn-logo.png";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import NextButton from "./NextButton";

const Testing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setStep(2);
    }
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (formData.location.trim()) {
      setIsLoading(true);
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

        setIsLoading(false);
        setShowSuccess(true);
      } catch (error) {
        console.error("Error saving data:", error);
        setIsLoading(false);
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

  const isFormComplete = formData.name.trim() && formData.location.trim();

  return (
    <>
      <div className="test_container">
        <p className="start_txt">To start analysis</p>
      </div>
      <div className="testing_rotate-container">
        <div className="test_box-1"></div>
        <div className="test_box-2"></div>
        <div className="test_box-3"></div>
        <div className="form_container">
          {showSuccess ? (
            <div className="success_message">
              <p className="success_para-1">Thank you! </p>
              <p className="success_para-2">Proceed for the next step</p>
            </div>
          ) : isLoading ? (
            <div className="loading_state">
              <div className="spinner"></div>
              <div className="loading_text" >Processing submission</div>
            </div>
          ) : step === 1 ? (
            <form className="test_form" onSubmit={handleNameSubmit}>
              <div className="testing_introduction">
                <p className="test_intro-para">Click to type</p>
                <input
                  className="input_intro"
                  placeholder="Introduce Yourself"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  autoFocus
                />
              </div>
            </form>
          ) : (
            <form className="test_form" onSubmit={handleLocationSubmit}>
              <p className="test_intro-para">your city name</p>
              <input
                className="input_intro"
                placeholder="your city name"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  handleInputChange("location", e.target.value)
                }
                autoFocus
              />
            </form>
          )}
        </div>
      </div>
      {showSuccess && (
        <div className="btns_container">
          <NextButton className="test_btn-next" navigateTo="/results" />
          
        </div>
      )}
      <div className="btns_container">
      <BackButton className="test_btn-back" navigateTo="/" />
      
      </div>
    </>
  );
};

export default Testing;
