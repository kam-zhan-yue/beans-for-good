import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import constants from '../Constants';

const assetURL = './assets/items/'


const Complete = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 20vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 600px; // Adjust max height here
`

const ConfirmationText = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: center; /* Align text to the center */
    color: ${constants.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Ensure the text takes up the full height of the container */
`

const CloseButton = styled.img`
    width: 80px;
    height: 80px;

    image-rendering: pixelated; /* Preserve image quality when scaled up */

    transitian: 0.3s;
    -webkit-transition: 0.3s;
    &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    }
`

export const DonationConfirmationPanel = ({ onConfirmed }) => {
  return (
    <div>
        <Complete>
            <ConfirmationText>
                Thank you for donating!
            </ConfirmationText>
        </Complete>
            <CloseButton src='./assets/ui/close-button.png' 
            onClick={()=>onConfirmed()}></CloseButton>
    </div>
  );
};