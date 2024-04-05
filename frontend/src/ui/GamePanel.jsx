import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

const GameOverlay = styled.div`
`
const BackpackOverlay = styled.div`
  position: fixed;
  bottom: 0px; /* Adjust this value as needed */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`

const CurrencyOverlay = styled.div`
  position: fixed;
  top: 0px; /* Adjust this value as needed */
  left: 0px;
  transform: translateX(20%) translateY(20%);
  text-align: center;
`

const Backpack = styled.img`
  width: 80px;
  height: 80px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`

const Coin = styled.img`
  width: 80px;
  height: 80px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`

export const GamePanel = ({ inventoryClicked, currencyClicked}) => {
  return (
    <GameOverlay>
      <BackpackOverlay>
        <Backpack src='./assets/ui/backpack.png' onClick={()=>inventoryClicked()}></Backpack>
      </BackpackOverlay>

      <CurrencyOverlay>
        <Coin src='./assets/ui/coin.png' onClick={()=>currencyClicked()}></Coin>
      </CurrencyOverlay>
    </GameOverlay>
  );
};