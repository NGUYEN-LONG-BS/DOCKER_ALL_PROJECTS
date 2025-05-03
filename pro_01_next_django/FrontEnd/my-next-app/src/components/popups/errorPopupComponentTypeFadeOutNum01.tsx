import React, { useState, useEffect } from "react";

// Define the props for the Popup component
interface PopupProps {
  message: string | null; // The message to display
  onClose: () => void; // Function to close the popup
}

const ErrorPopupTypeFadeOut: React.FC<PopupProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // When the message changes, make the popup visible and trigger the fade out after 2 seconds
  useEffect(() => {
    if (message) {
      setIsVisible(true); // Show the popup
      // After 2 seconds, start fading out
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the popup after 2 seconds
        onClose(); // Call onClose to reset the error message
      }, 1000); // 1000ms = 1 seconds

      return () => clearTimeout(timer); // Clean up timer when the component is unmounted or message changes
    }
  }, [message, onClose]);

  if (!message) return null; // Don't render if there's no message

  return (
    <div
      className={`popup-overlay ${isVisible ? "fade-in" : "fade-out"}`}
      style={{
        position: "fixed",
        bottom: "20px", // Position at the top with some spacing
        right: "20px", // Position to the right with some spacing
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        transition: "opacity 1s ease-out", // Apply smooth fading transition
        opacity: isVisible ? 1 : 0, // Control visibility with opacity
        borderRadius: "12px", // Apply border radius to the overlay itself
        overflow: "hidden", // Prevent content from spilling outside
        width: "300px", // Set a fixed width for the popup
        height: "120px", // Set a fixed height for the popup
      }}
    >
      <div
        className="popup-container"
        style={{
          backgroundColor: "#f0f0f0", // Light gray background color for the popup container
          padding: "20px",
          borderRadius: "12px", // Rounded corners for the content box
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow for depth
          maxWidth: "100%", // Ensure it fits within the fixed width
          textAlign: "center",
          transition: "opacity 1s ease-out",
          width: "100%", // Make the container fill the entire parent width
          height: "100%", // Ensure content fits within the fixed height
        }}
      >
        <h5 style={{ color: "#d9534f", fontWeight: "bold" }}>Error</h5>
        <p style={{ color: "#333" }}>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopupTypeFadeOut;
