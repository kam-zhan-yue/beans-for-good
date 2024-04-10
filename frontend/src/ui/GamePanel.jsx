import React, { useEffect, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import constants from '../Constants';
import { CookiesProvider, useCookies } from 'react-cookie';
import StaticHelper from '../StaticHelper';

const GameOverlay = styled.div`
`

const BackpackOverlay = styled.div`
  padding: 10px;
  border: 16px solid transparent;
  border-image: url(./assets/ui/panel.png) 7.5 fill repeat;

  position: fixed;
  bottom: 10px; /* Adjust this value as needed */
  left: 50%;
  transform: translateX(-50%);
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

const CurrencyOverlay = styled.div`
  padding-right: 10px; // Adjust padding here
  padding-left: 10px; // Adjust padding here
  border: 16px solid transparent;
  border-image: url(./assets/ui/panel.png) 7.5 fill repeat;

  position: fixed;
  top: 0px; /* Adjust this value as needed */
  right: 0px;
  transform: translate(-50%, 20%);
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* Add transition for smooth animation */
  transition: transform 0.3s;

  &:hover {
    cursor: pointer;
    transform: translate(-50%, 10%); /* Adjust the translateY value */
  }
`

const CurrencyText = styled.h1`
  margin-right: 10px; /* Adjust margin as needed */
  font-family: "VT323", monospace;
  font-size: 75px; /* Adjust font size as needed */
  font-weight: 400;
  margin-right: 10px;
  color: ${constants.primary}
`

const Coin = styled.img`
  width: 60px;
  height: 60px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;
`

export const GamePanel = ({ inventoryClicked, currencyClicked }) => {
  const [coins, setCoins] = useState(0);
  const [cookies, setCookie] = useCookies(['amount']);

  useEffect(() => {
    const fetchCoins = async () => {
      console.log(`${StaticHelper.getApi()}beans/evan`);
      const items = await fetch(`${StaticHelper.getApi()}beans/evan`);
      const response = await items.json();
      setCoins(response.beans);
    };

    fetchCoins();
  });

  return (
    <GameOverlay>
      <BackpackOverlay>
        <Backpack src='./assets/ui/backpack.png' onClick={() => inventoryClicked()}></Backpack>
      </BackpackOverlay>

      <CurrencyOverlay onClick={() => currencyClicked()}>
        <CurrencyText>{coins}</CurrencyText>
        <Coin src='./assets/ui/coin.png'></Coin>
      </CurrencyOverlay>
    </GameOverlay>
  );
};