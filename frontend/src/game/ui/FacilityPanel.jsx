// ReactUIComponent.js

import React, { forwardRef, useImperativeHandle } from 'react';

export const FacilityPanel = forwardRef(function FacilityPanel ({ props }, ref)
{
  const handleInteractionStart = (interaction) => {
      // Your logic to handle interaction start
      console.log(`Interaction started in FacilityPanel with ${interaction.facilityID} of type ${interaction.facilityType}`);
  };

  useImperativeHandle(ref, () => ({
    handleInteractionStart
  }));

  return (
      <div style={overlayStyle}>
      </div>
    );
  });
  
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }