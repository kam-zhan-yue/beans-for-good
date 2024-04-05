import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

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
  width: 8vw;
  height: 8vw;
`

const ItemImage = styled.img`

`

const ItemQuantity = styled.div`
  font-family: "VT323", monospace;
  font-size: 30px;
  font-weight: 400;
  position: absolute;
  bottom: -10px;
  right: -10px;
  z-index: 3;

  background-color: #00000090;

  padding: 5px;
  border-radius: 3px;

  color: rgb(219, 219, 219);
`


const assetURL = './assets/items/'

export const RequestItem = ({ itemData }) => {
    return (
        <div>
            <ItemBackground>
                <ItemImage src={assetURL + itemData.sprite} />
            </ItemBackground>
        </div>
    );
};