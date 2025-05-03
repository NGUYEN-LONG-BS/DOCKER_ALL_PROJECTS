import React, { useState, useEffect } from "react";

// Define the props for the Popup component
interface PopupProps {
  message: string | null; // The message to display
  onClose: () => void; // Function to close the popup
}

const errorPopupTypeFadeOut: React.FC<PopupProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // When the message changes, make the popup visible and trigger the fade out after 3 seconds
  useEffect(() => {
    if (message) {
      setIsVisible(true); // Show the popup
      // After 3 seconds, start fading out
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the popup after 3 seconds
        onClose(); // Call onClose to reset the error message
      }, 3000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Clean up timer when the component is unmounted or message changes
    }
  }, [message, onClose]);

  if (!message) return null; // Don't render if there's no message

  return (
    <div
      className={`popup-overlay ${isVisible ? "fade-in" : "fade-out"}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        transition: "opacity 1s ease-out", // Apply smooth fading transition
        opacity: isVisible ? 1 : 0, // Control visibility with opacity
      }}
    >
      <div
        className="popup-container"
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          transition: "opacity 1s ease-out",
        }}
      >
        <h5 style={{ color: "#d9534f", fontWeight: "bold" }}>Error</h5>
        <p style={{ color: "#333" }}>{message}</p>
      </div>
    </div>
  );
};

export default errorPopupTypeFadeOut;
