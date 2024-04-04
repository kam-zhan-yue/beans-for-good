// ReactUIComponent.js
import React from 'react';

export const ReactOverlay = () => {
    return (
      <div style={overlayStyle}>
        <h1>Hello worlede</h1>
      </div>
    );
  };
  
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }