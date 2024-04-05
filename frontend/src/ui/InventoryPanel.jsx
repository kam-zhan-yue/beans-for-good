import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  bottom: -20px; /* Adjust this value as needed */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`

const Backpack = styled.img`
  width: 160px;
  height: 160px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`

export const InventoryPanel = ({ interactionOver }) => {

    const closeButtonClicked = () => {
      // setCurrentFacility(null);
      if(interactionOver instanceof(Function))
      {
        interactionOver();
      }
    }
  
  return (
    <Overlay>
        <button className="button" onClick={closeButtonClicked}>Close Panel</button>
    </Overlay>
  );
};