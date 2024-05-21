import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Check } from 'react-bootstrap-icons';
import './DroneBuilder.css';

const parts = {
  frames: [
    { name: 'Frame A', price: 50 },
    { name: 'Frame B', price: 70 },
    { name: 'Frame C', price: 60 },
    { name: 'Frame D', price: 80 },
  ],
  motors: [
    { name: 'Motor X', price: 100 },
    { name: 'Motor Y', price: 150 },
    { name: 'Motor Z', price: 130 },
    { name: 'Motor W', price: 120 },
  ],
  controllers: [
    { name: 'Controller 1', price: 200 },
    { name: 'Controller 2', price: 250 },
    { name: 'Controller 3', price: 230 },
    { name: 'Controller 4', price: 220 },
  ],
  propellers: [
    { name: 'Propeller A', price: 20 },
    { name: 'Propeller B', price: 25 },
    { name: 'Propeller C', price: 22 },
    { name: 'Propeller D', price: 28 },
  ],
  batteries: [
    { name: 'Battery A', price: 80 },
    { name: 'Battery B', price: 90 },
    { name: 'Battery C', price: 85 },
    { name: 'Battery D', price: 95 },
  ],
  cameras: [
    { name: 'Camera A', price: 150 },
    { name: 'Camera B', price: 180 },
    { name: 'Camera C', price: 160 },
    { name: 'Camera D', price: 170 },
  ],
};

const DroneBuilder = () => {
  const [selectedParts, setSelectedParts] = useState({
    frame: null,
    motor: null,
    controller: null,
    propeller: null,
    battery: null,
    camera: null,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handlePartSelect = (type, part) => {
    setSelectedParts((prevSelectedParts) => ({
      ...prevSelectedParts,
      [type]: part,
    }));
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedParts).reduce((total, part) => {
      return total + (part ? part.price : 0);
    }, 0);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const steps = [
    'frames',
    'motors',
    'controllers',
    'propellers',
    'batteries',
    'cameras',
  ];

  const currentPartType = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

  return (
    <div className="dronebuilder-container">
      <div className="background-overlay"></div>
      <Sidebar />
      <div className="main-content">
        <div className="header-container">
          <span role="img" aria-label="drone">🛠️</span>
        </div>
        <div className="wizard-container">
          <div className="wizard-step active">
            <h2 className="centered-heading">
              What <span className="gradient-text"><strong>{currentPartType.charAt(0).toUpperCase() + currentPartType.slice(1)}</strong></span> would you like to select?
            </h2>
            <div className="part-options centered">
              {parts[currentPartType].map((part) => (
                <div
                  key={part.name}
                  className={`part-item ${selectedParts[currentPartType]?.name === part.name ? 'selected' : ''}`}
                  onClick={() => handlePartSelect(currentPartType, part)}
                >
                  <div className="image-placeholder"></div>
                  <p>{part.name}</p>
                  <p className="price">${part.price}</p>
                  {selectedParts[currentPartType]?.name === part.name && (
                    <div className="check-icon">
                      <Check />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="bar-container centered">
              <p>Total Price: <span className="price">${calculateTotalPrice()}</span></p>
            </div>
          </div>
        </div>
        <div className="navigation-buttons centered">
          {currentStep > 1 && <button className="prev-button" onClick={prevStep}>Previous</button>}
          {!isLastStep && <button className="next-button" onClick={nextStep}>Next</button>}
          {isLastStep && <button className="confirm-button">Confirm</button>}
        </div>
      </div>
    </div>
  );
};

export default DroneBuilder;
