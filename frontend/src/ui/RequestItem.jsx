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
  border: 8px solid transparent;
  border-image: url(./assets/ui/inventory-item-background.png) 7.5 fill repeat;
  margin-right: 2.5px;
  margin-left: 2.5px;
  /* Maintain aspect ratio for square item */
  width: 2.5vw;
  height: 2.5vw;
`

const ItemImage = styled.img`
width: 100%;
height: auto;
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