import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const Inventory = styled.div`
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

const assetsURL = './assets/'



export const InventoryPanel = ({ interactionOver }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [itemList, setItemList] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    }

    useEffect(() => {
        const fetchInventory = async (setInventory) => {
            const items = await fetch(assetsURL + 'dummy_inventory.json')
            const response = await items.json();
            setInventory(response.items);
        }

        const fetchItemList = async (setItemList) => {
            const response = await fetch('./assets/items/item_list.json');
            const itemList = await response.json();
            setItemList(itemList);
        }


        fetchItemList(setItemList);
        fetchInventory(setInventoryData);
    }, []);

    const inventoryItems = inventoryData.map(item => {
        const itemData = itemList[item.id];
        itemData.quantity = item.quantity;
        return itemData;
    });
    const inventoryComponents = inventoryItems.map(item => <InventoryItem itemData={item} />);
    console.log(itemList);

    return (
        <Overlay>
            <Inventory>
                {inventoryComponents}
            </Inventory>
            <button className="button" onClick={closeButtonClicked}>Close Panel</button>
        </Overlay>
    );
};