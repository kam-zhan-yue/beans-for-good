import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

const ItemBackground = styled.div`
background-color: rgba(0, 0, 0, 0);
box-sizing: border-box;
image-rendering: pixelated;
image-rendering: -moz-crisp-edges;
image-rendering: crisp-edges;
min-width: 10vw; /* Minimum width as 10% of viewport width */
max-width: 10vw; /* Maximum width as 10% of viewport width */
min-height: 10vw; /* Minimum height as 10% of viewport width */
max-height: 10vw; /* Maximum height as 10% of viewport width */
position: relative;
border: 16px solid transparent;
border-image: url(./assets/ui/inventory-item-background.png) 7.5 fill repeat;

/* Maintain aspect ratio for square item */
width: 10vw;
height: 10vw;
`


const assetURL = './assets/items/'

export const InventoryItem = ({ itemData }) => {
  return (
    <ItemBackground>
      <img src={assetURL + itemData.sprite} />
      <span>{itemData.name}</span>
      <span>{itemData.quantity}</span>
    </ItemBackground>
  );
};