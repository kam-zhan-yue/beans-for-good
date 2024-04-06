import React, { useEffect, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import constants from '../Constants';

const CurrencyOverlay = styled.div`
  padding-right: 10px; // Adjust padding here
  padding-left: 10px; // Adjust padding here
  border: 16px solid transparent;
  border-image: url(./assets/ui/name-panel.png) 7.5 fill repeat;

  position: fixed;
  top: 0px; /* Adjust this value as needed */
  left: 0px;
  transform: translate(0%, -102%);
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* Add transition for smooth animation */
  transition: transform 0.3s;
`

const CurrencyText = styled.h1`
  margin-right: 10px; /* Adjust margin as needed */
  font-family: "VT323", monospace;
  font-size: 50px; /* Adjust font size as needed */
  font-weight: 400;
  margin-right: 10px;
  color: ${constants.primary}
`

const Coin = styled.img`
  width: 50px;
  height: 50px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;
`

export const CurrencyOverlayPanel = ({ onClick, coins}) => {

const handleClick = onClick ? () => onClick() : () => {}; // Check if onClick is provided

  return (
      <CurrencyOverlay onClick={() => handleClick}>
        <CurrencyText>{coins}</CurrencyText>
        <Coin src='./assets/ui/coin.png'></Coin>
      </CurrencyOverlay>
  );
}