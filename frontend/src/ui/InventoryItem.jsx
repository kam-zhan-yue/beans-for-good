import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';

const ItemBackground = styled.div`
background-color: rgba(0, 0, 0, 0);
box-sizing: border-box;
image-rendering: pixelated;
image-rendering: -moz-crisp-edges;
image-rendering: crisp-edges;
-webkit-transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
z-index: 0;
width: 100%; // Adjust item size here
padding-top: 100%; // Maintain aspect ratio for square item
position: relative;
border: 16px solid transparent;
border-image: url(./assets/ui/inventory-item-background.png) 7.5 fill repeat;
`;

export const InventoryItem = ({ itemData }) => {  
  return (
    <ItemBackground></ItemBackground>
  );
};