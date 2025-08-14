import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import BackButton from './BackButton'
import NextButton from './NextButton'
import DiamondImg from '../assete/diamond-img.webp'

const Summary = () => {
  const [apiData, setApiData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('race'); // Default to race.
  const [displayData, setDisplayData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // This will track the selected individual item.

  useEffect(() => {
    document.body.classList.add('summary-page');
    
    // This gets the API data from localStorage.
    const storedData = localStorage.getItem('skinstricAnalysisResult');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setApiData(parsedData);
        console.log('API Data:', parsedData);
        
        // This will set the initial display data to race data.
        if (parsedData && parsedData.data && parsedData.data.race) {
          const initialData = processPercentageData(parsedData.data.race, 'race');
          setDisplayData(initialData);
          
          // This automatically selects the predicted race item. (highest percentage)
          if (initialData.length > 0) {
            const predictedItem = initialData.reduce((max, item) => 
              item.percentage > max.percentage ? item : max
            );
            setSelectedItem(predictedItem);
          }
        }
      } catch (error) {
        console.error('Error parsing stored API data:', error);
      }
    }

    return () => {
      document.body.classList.remove('summary-page');
    };
  }, []);

  // Function to process percentage data and sort appropriately.
  const processPercentageData = (data, category = selectedCategory) => {
    if (!data || typeof data !== 'object') return [];
    
    const processedData = Object.entries(data)
      .map(([key, value]) => ({
        name: key.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        percentage: parseFloat(value) * 100, // Converts decimal to percentage.
        rawKey: key // Keeps original key for age sorting.
      }));
    
    // Sorts differently based on category.
    if (category === 'age') {
      // For age, sort by numerical age value. (lowest to highest)
      return processedData.sort((a, b) => {
        const ageA = parseInt(a.rawKey.split('-')[0]) || parseInt(a.rawKey);
        const ageB = parseInt(b.rawKey.split('-')[0]) || parseInt(b.rawKey);
        return ageA - ageB;
      });
    } else {
      // For race and sex, sort by percentage. (highest to lowest)
      return processedData.sort((a, b) => b.percentage - a.percentage);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    
    if (!apiData || !apiData.data) return;
    
    let dataToProcess = null;
    
    switch (category) {
      case 'race':
        dataToProcess = apiData.data.race || {};
        break;
      case 'age':
        dataToProcess = apiData.data.age || {};
        break;
      case 'sex':
        dataToProcess = apiData.data.gender || {};
        break;
      default:
        dataToProcess = {};
    }
    
    const processedData = processPercentageData(dataToProcess, category);
    setDisplayData(processedData);
    
    // Auto select for the predicted item. (highest percentage)
    if (processedData.length > 0) {
      // Finds the item with the highest percentage. (the predicted value)
      const predictedItem = processedData.reduce((max, item) => 
        item.percentage > max.percentage ? item : max
      );
      setSelectedItem(predictedItem);
    } else {
      setSelectedItem(null);
    }
  };

  // Handles clicking on individual items. 
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Get the top percentage for the selected category.
  const getTopPercentage = () => {
    if (selectedItem) {
      return selectedItem.percentage; // Use selected item's percentage.
    }
    if (displayData.length === 0) return 0;
    return displayData[0].percentage; // First item is highest due to sorting.
  };

  // Get the top predicted value for each category.
  const getTopPrediction = (category) => {
    if (!apiData || !apiData.data) return 'N/A';
    
    let categoryData = null;
    
    switch (category) {
      case 'race':
        categoryData = apiData.data.race || {};
        break;
      case 'age':
        categoryData = apiData.data.age || {};
        break;
      case 'sex':
        categoryData = apiData.data.gender || {};
        break;
      default:
        return 'N/A';
    }
    
    // This finds the key with the highest percentage.
    if (Object.keys(categoryData).length === 0) return 'N/A';
    
    const topEntry = Object.entries(categoryData)
      .reduce((max, [key, value]) => 
        parseFloat(value) > parseFloat(max[1]) ? [key, value] : max
      );
    
    return topEntry[0];
  };

  return (
    <div className='summary_container'>
      <div className="summary_header-container">
        <h2 className='header_intro'>A.I Analysis</h2>
        <h3 className='dem_txt'>Demographics</h3>
        <h4 className='pred_txt'>Predicted race & age</h4>
      </div>

      <div className="dem_container">
        <div className="pred_row">
          <div 
            className={`pred_race ${selectedCategory === 'race' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('race')}
            style={{ cursor: 'pointer' }}
          >
            <h2 className='race'>{getTopPrediction('race').charAt(0).toUpperCase() + getTopPrediction('race').slice(1).toLowerCase()}</h2>
            <p className='race-txt'>RACE</p>
          </div>
          <div 
            className={`pred_age ${selectedCategory === 'age' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('age')}
            style={{ cursor: 'pointer' }}
          >
            <h2 className='age'>{getTopPrediction('age')}</h2>
            <p className='age_txt'>AGE</p>
          </div>
          <div 
            className={`pred_sex ${selectedCategory === 'sex' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('sex')}
            style={{ cursor: 'pointer' }}
          >
            <h2 className='sex'>{getTopPrediction('sex').toUpperCase()}</h2>
            <p className='sex_txt'>SEX</p>
          </div>
        </div>
        <div className="graph_container">
          <div className="graph_row">
            <p className='race_txt'>
              {selectedCategory === 'race' ? getTopPrediction('race').charAt(0).toUpperCase() + getTopPrediction('race').slice(1).toLowerCase() : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + getTopPrediction(selectedCategory)}
            </p>
          </div>
          <div className="graph_box">
            <div className="graph">
                <p className='graph_percentage'>{getTopPercentage().toFixed(0)}%</p>
              <div className="outer">
                <div className="inner">
                </div>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                version="1.1" 
                width="420px" 
                height="420px"
                style={{ position: 'absolute', top: '-60px', left: '-60px' }}
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#1a1b1c" />
                    <stop offset="100%" stopColor="#1a1b1c" />
                  </linearGradient>
                </defs>
                {/* Background circle for the non-filled portion. */}
                <circle 
                  cx="210" 
                  cy="210" 
                  r="197" 
                  strokeLinecap="round" 
                  style={{
                    fill: 'none',
                    stroke: '#c0c0c0',
                    strokeWidth: '7px',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '210px 210px'
                  }}
                />
                {/* Progress circle. */}
                <circle 
                  cx="210" 
                  cy="210" 
                  r="197" 
                  strokeLinecap="round" 
                  style={{
                    fill: 'none',
                    stroke: 'url(#GradientColor)',
                    strokeWidth: '7px',
                    strokeDasharray: '1238', 
                    strokeDashoffset: `${1238 - (getTopPercentage() / 100) * 1238}`,
                    transition: 'stroke-dashoffset 1s ease-in-out',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '210px 210px'
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="race_container">
          <div className="race_row">
            <div className="race_header">
              <h4>{selectedCategory.toUpperCase()}</h4>
              <h4>A.I. CONFIDENCE</h4>
            </div>
            
            {displayData.map((item, index) => (
              <div 
                key={index} 
                className={`race_box ${(index === 0 && !selectedItem) || (selectedItem && selectedItem.name === item.name) ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <a className="race_1">
                  <div className='large_small-diamond'>
                    {((index === 0 && !selectedItem) || (selectedItem && selectedItem.name === item.name)) && (
                      <div className='small_diamond'></div>
                    )}
                  </div>
                  <span className='race_name'>{item.name}</span>
                </a>
                <span className='race_percent'>{item.percentage.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
          <div className="message">If A.I estimate is wrong, select the correct one.
          </div>
        </div>
      <div className="btns_container">
        <BackButton navigateTo="/select" />
        <NextButton navigateTo="/" />
      </div>
    </div>
  )
}

export default Summary