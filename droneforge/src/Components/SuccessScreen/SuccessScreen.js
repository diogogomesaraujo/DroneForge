import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import './SuccessScreen.css';

const SuccessScreen = () => {
  const animationContainer = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch('https://lottie.host/0fa8431b-b2a1-4724-aca9-ba550771661a/6TjAHBMW6t.json'); // Update the URL to your animation
        const data = await response.json();

        if (animationInstance.current) {
          animationInstance.current.destroy(); // Clean up the previous instance if it exists
        }

        animationInstance.current = lottie.loadAnimation({
          container: animationContainer.current, // the container element
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: data, // the animation data
        });

        // Set a timeout to destroy the animation after a longer delay (e.g., 5 seconds)
        setTimeout(() => {
          if (animationInstance.current) {
            animationInstance.current.destroy();
          }
        }, 3000); // 5 seconds

      } catch (error) {
        console.error('Failed to load animation data:', error);
      }
    };

    loadAnimation();

    // Cleanup function to destroy Lottie instance when component unmounts or re-renders
    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="success-screen">
      <div className="animation-container" ref={animationContainer}></div>
    </div>
  );
};

export default SuccessScreen;
