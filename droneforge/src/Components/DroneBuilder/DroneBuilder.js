import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Check } from 'react-bootstrap-icons';
import './DroneBuilder.css';

const parts = {
  frame: [
    { name: 'Frame A', price: 50 },
    { name: 'Frame B', price: 70 },
    { name: 'Frame C', price: 60 },
    { name: 'Frame D', price: 80 },
  ],
  motor: [
    { name: 'Motor X', price: 100 },
    { name: 'Motor Y', price: 150 },
    { name: 'Motor Z', price: 130 },
    { name: 'Motor W', price: 120 },
  ],
  controller: [
    { name: 'Controller 1', price: 200 },
    { name: 'Controller 2', price: 250 },
    { name: 'Controller 3', price: 230 },
    { name: 'Controller 4', price: 220 },
  ],
  propeller: [
    { name: 'Propeller A', price: 20 },
    { name: 'Propeller B', price: 25 },
    { name: 'Propeller C', price: 22 },
    { name: 'Propeller D', price: 28 },
  ],
  battery: [
    { name: 'Battery A', price: 80 },
    { name: 'Battery B', price: 90 },
    { name: 'Battery C', price: 85 },
    { name: 'Battery D', price: 95 },
  ],
  camera: [
    { name: 'Camera A', price: 150 },
    { name: 'Camera B', price: 180 },
    { name: 'Camera C', price: 160 },
    { name: 'Camera D', price: 170 },
  ],
  gps: [
    { name: 'GPS Module 1', price: 50 },
    { name: 'GPS Module 2', price: 60 },
    { name: 'GPS Module 3', price: 55 },
    { name: 'GPS Module 4', price: 65 },
  ],
  sensor: [
    { name: 'Sensor 1', price: 40 },
    { name: 'Sensor 2', price: 45 },
    { name: 'Sensor 3', price: 42 },
    { name: 'Sensor 4', price: 48 },
  ],
};

const DroneBuilder = () => {
  const [selectedParts, setSelectedParts] = useState({
    frame: null,
    motor: { part: null, quantity: 1 },
    controller: null,
    propeller: { part: null, quantity: 1 },
    battery: { part: null, quantity: 1 },
    camera: null,
    gps: null,
    sensor: { part: null, quantity: 1 },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [wordTransitioning, setWordTransitioning] = useState(false);
  const [partTransitioning, setPartTransitioning] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePartSelect = (type, part) => {
    if (['motor', 'propeller', 'battery', 'sensor'].includes(type)) {
      setSelectedParts((prevSelectedParts) => ({
        ...prevSelectedParts,
        [type]: { ...prevSelectedParts[type], part },
      }));
    } else {
      setSelectedParts((prevSelectedParts) => ({
        ...prevSelectedParts,
        [type]: part,
      }));
    }
  };

  const handleQuantityChange = (type, event) => {
    let value = event.target.value;
    const quantity = value === '' ? '' : Math.max(1, parseInt(value));
    setSelectedParts(prevSelectedParts => ({
      ...prevSelectedParts,
      [type]: { ...prevSelectedParts[type], quantity },
    }));
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      Object.values(selectedParts).forEach((part) => {
        if (part && typeof part === 'object' && part.part) {
          total += (part.part.price || 0) * (part.quantity || 1);
        } else if (part) {
          total += part.price || 0;
        }
      });
      return total;
    };

    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [selectedParts]);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setWordTransitioning(true);
      setPartTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        setWordTransitioning(false);
        setPartTransitioning(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setWordTransitioning(true);
      setPartTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep - 1);
        setWordTransitioning(false);
        setPartTransitioning(false);
      }, 300);
    }
  };

  const steps = [
    'frame',
    'motor',
    'controller',
    'propeller',
    'battery',
    'camera',
    'gps',
    'sensor',
  ];

  const currentPartType = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

  return (
    <div className="dronebuilder-container">
      <div className="dronebuilder-background-overlay"></div>
      <Sidebar />
      <div className="dronebuilder-main-content">
        <div className="dronebuilder-header-container">
          <span role="img" aria-label="drone">🛠️</span>
        </div>
        <div className="dronebuilder-wizard-container">
          <h2 className="dronebuilder-centered-heading">
            What <span className={`dronebuilder-word-text ${wordTransitioning ? 'dronebuilder-word-hidden' : 'dronebuilder-word-visible'}`}><strong>{currentPartType.charAt(0).toUpperCase() + currentPartType.slice(1)}</strong></span> would you like to select?
          </h2>
          <div className={`dronebuilder-part-options dronebuilder-centered ${partTransitioning ? 'dronebuilder-part-hidden' : 'dronebuilder-part-visible'}`}>
            {parts[currentPartType].map((part) => (
              <div
                key={part.name}
                className={`dronebuilder-part-item ${selectedParts[currentPartType]?.part?.name === part.name || selectedParts[currentPartType]?.name === part.name ? 'dronebuilder-selected' : ''}`}
                onClick={() => handlePartSelect(currentPartType, part)}
              >
                <div className="dronebuilder-image-placeholder"></div>
                <p>{part.name}</p>
                <p className="dronebuilder-price">${part.price}</p>
                {(selectedParts[currentPartType]?.part?.name === part.name || selectedParts[currentPartType]?.name === part.name) && (
                  <div className="dronebuilder-check-icon">
                    <Check />
                  </div>
                )}
              </div>
            ))}
          </div>
          {['motor', 'propeller', 'battery', 'sensor'].includes(currentPartType) && (
            <div className="dronebuilder-quantity-selector">
              <label htmlFor={`${currentPartType}-quantity`}>Quantity:</label>
              <input
                id={`${currentPartType}-quantity`}
                type="number"
                min="1"
                step="1"  // Slows down the scrolling speed
                value={selectedParts[currentPartType]?.quantity}
                onChange={(e) => handleQuantityChange(currentPartType, e)}
                onFocus={handleInputFocus}
              />
            </div>
          )}
        </div>
        <div className="dronebuilder-bar-container dronebuilder-centered">
          <p>Total Price: <span className="dronebuilder-price">${totalPrice}</span></p>
        </div>
        <div className="dronebuilder-navigation-buttons dronebuilder-centered">
          {currentStep > 1 && <button className="dronebuilder-button-common" onClick={prevStep}>Previous</button>}
          {!isLastStep && <button className="dronebuilder-button-common" onClick={nextStep}>Next</button>}
          {isLastStep && <button className="dronebuilder-button-common">Confirm</button>}
        </div>
      </div>
    </div>
  );
};

export default DroneBuilder;
