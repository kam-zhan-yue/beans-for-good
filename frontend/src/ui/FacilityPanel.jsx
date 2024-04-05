import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { StorePanel } from './StorePanel';
import { CentrePanel } from './CentrePanel';

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
        {facility && facility.facilityType === 'store' &&
          <StorePanel
            data={facility}
            interactionOver={interactionOver}>
          </StorePanel>}
        {facility && facility.facilityType === 'centre' &&
          <CentrePanel
            data={facility}
            interactionOver={interactionOver}>
          </CentrePanel>}
      </Overlay>
    );
};