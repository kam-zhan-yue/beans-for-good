import React, { forwardRef, useState, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const Store = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2vw; // Adjust gap between items here
  
    padding: 10px;

    background-color: rgba(0, 0, 0, 0); 

    box-sizing: border-box;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;

    -webkit-transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
    transition:         all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);

    z-index: 0;

    // max-width: 500px;
    // min-height: 330px;
    margin: 7px;

    position: relative;

    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
`

export const StorePanel = ({ data, interactionOver }) => {

    const closeButtonClicked = () => {
        if(interactionOver instanceof(Function))
        {
            interactionOver();
        }
    }
  
    return (
    <Overlay>
        <Store>
        </Store>
        <button className="button" onClick={closeButtonClicked}>Close Panel</button>
    </Overlay>
    );
};