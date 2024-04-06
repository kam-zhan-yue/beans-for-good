import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import constants from '../Constants';

const ItemBackground = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
  // text-align: center;
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
  position: relative;
  border: 16px solid transparent;
  border-image: url(./assets/ui/inventory-item-background.png) 7.5 fill repeat;
  margin:10px;
  /* Maintain aspect ratio for square item */
  width: 6vw;
  height: 6vw;
  
  /* Add transition for smooth animation */
  transition: transform 0.3s;

  &:hover {
      // cursor: pointer;
      transform: translateY(-5px);
    }
`

const ItemImage = styled.img`

`

const ItemQuantityHolder = styled.div`
position: absolute;
bottom: -10px;
right: -10px;
z-index: 3;

background-color: #00000090;
`

const ItemQuantity = styled.div`
  font-family: "VT323", monospace;
  font-size: 16px;
  font-weight: 400;
  // position: absolute;
  // bottom: -10px;
  // right: -10px;
  // z-index: 3;

  padding-left: 4px;
  padding-right: 4px;
  border-radius: 3px;

  color: rgb(219, 219, 219);
`


const assetURL = './assets/items/'

export const SubInventoryItem = ({ itemData, onItemClicked }) => {
  const handleClick = () => {
    if (onItemClicked) {
      onItemClicked(itemData); // Pass the itemData to the callback function
    }
  };

  return (
    <div>
      <ItemBackground onClick={handleClick}>
        <ItemImage src={assetURL + itemData.sprite} />
        {itemData.quantity > 0 &&
        <ItemQuantityHolder>
          <ItemQuantity>
            {itemData.quantity}
          </ItemQuantity>
        </ItemQuantityHolder>
         }
      </ItemBackground>
    </div>
  );
};