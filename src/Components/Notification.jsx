import React from "react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-button">X</button>
    </div>
  );
};

export default Notification;