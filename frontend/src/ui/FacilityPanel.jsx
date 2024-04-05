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

export const FacilityPanel = ({ facility, interactionOver }) => {

  const closeButtonClicked = () => {
    // setCurrentFacility(null);
    if(interactionOver instanceof(Function))
    {
      interactionOver();
    }
  }

  return (
      <Overlay>
        {facility && <div>
          <Header>{facility.facilityType} - {facility.facilityID}</Header>
          <button className="button" onClick={closeButtonClicked}>Close Panel</button>
          </div>}
      </Overlay>
    );
};