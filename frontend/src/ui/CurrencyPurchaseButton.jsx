import React from 'react';
import styled from 'styled-components';
import constants from '../Constants';

const ButtonName = styled.h1`
    font-family: "VT323", monospace;
    font-size: 24px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: center; /* Align text to the right */
    color: ${constants.primary};
`


const ButtonContainer = styled.div`
    padding: 10px 20px;
    border: 16px solid transparent;
    border-image: url(./assets/ui/name-panel.png) 7.5 fill repeat;
    margin-bottom: 10px;

    /* Add transition for smooth animation */
    transition: transform 0.3s;
  
    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
      }
`

const CurrencyPurchaseButton = ({ amount, onClick }) => {
    return (
        <ButtonContainer onClick={() => onClick(amount)}>
           <ButtonName>
            Purchase {amount} Beans
            </ButtonName>
        </ButtonContainer>
    );
};

export default CurrencyPurchaseButton;
