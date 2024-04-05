import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const Header = styled.h1`
  font-family: "VT323", monospace;
  font-weight: 400;
  font-style: normal;

`

export const FacilityPanel = forwardRef(function FacilityPanel ({ interactionOver }, ref)
{
  const [currentInteraction, setCurrentInteraction] = useState(null);

  const handleInteractionStart = (interaction) => {
      // Your logic to handle interaction start
      console.log(`Interaction started in FacilityPanel with ${interaction.facilityID} of type ${interaction.facilityType}`);
      setCurrentInteraction(interaction);
  };

  useImperativeHandle(ref, () => ({
    handleInteractionStart
  }));

  const handleInteraction = () => {
    setCurrentInteraction(null);
    if(interactionOver instanceof(Function))
    {
      interactionOver();
    }
  }

  return (
      <Overlay>
        {currentInteraction && <div>
          <Header>{currentInteraction.facilityType} - {currentInteraction.facilityID}</Header>
          <button className="button" onClick={handleInteraction}>Close Panel</button>
          </div>}
      </Overlay>
    );
  });