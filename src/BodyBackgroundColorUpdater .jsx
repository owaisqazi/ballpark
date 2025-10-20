import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BodyBackgroundColorUpdater = () => {
  const history = useNavigate();

  // Function to update body background color based on pathname
  const updateBodyBackgroundColor = () => {
    const pathname = history.location.pathname;
    if (pathname === "/chat-box") {
      document.body.style.backgroundColor = "#363232";
    } else {
      document.body.style.backgroundColor = ""; // Revert to default
    }
  };

  // Call the function initially
  useEffect(() => {
    updateBodyBackgroundColor();

    // Listen for changes in the URL pathname
    const unlisten = history.listen(() => {
      updateBodyBackgroundColor();
    });

    // Clean up the listener when the component unmounts
    return () => {
      unlisten();
    };
  }, [history, updateBodyBackgroundColor]); // Include updateBodyBackgroundColor in the dependency array

  return null; // Since this component doesn't render anything visible, return null
};

export default BodyBackgroundColorUpdater;
