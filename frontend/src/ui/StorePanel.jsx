import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { StoreItem } from './StoreItem';

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
    const [storeData, setStoreData] = useState([]);
    const [itemList, setItemList] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStoreItems = async () => {
            const items = await fetch(`./assets/dummy_${data.facilityID}.json`);
            const response = await items.json();
            console.log(response);
            setStoreData(response.items);
        }

        const fetchItemList = async () => {
            const response = await fetch('./assets/items/item_list.json');
            const itemList = await response.json();
            setItemList(itemList);
        }


        fetchItemList();
        fetchStoreItems();
    }, []);

    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    }

    const storeItems = storeData.map(item => {
        const itemData = itemList[item.id];
        itemData.price = item.price;
        return itemData;
    });
    const storeComponents = storeItems.map(item => <StoreItem itemData={item} />);
    console.log(storeItems);


    return (
        <Overlay>
            <Store>
                {storeComponents}
            </Store>
            <button className="button" onClick={closeButtonClicked}>Close Panel</button>
        </Overlay>
    );
};