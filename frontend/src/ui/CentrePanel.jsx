import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';
import { RequestPanel } from './RequestPanel';
import { Grid } from "@material-ui/core";


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

const Inventory = styled.div`
    padding: 1vw; // Adjust padding here
    // background-color: rgba(0, 0, 0, 0);
    min-width: 50vw;
    max-width: 50vw; // Adjust max width here
    max-height: 50vh; // Adjust max height here
    overflow: auto; // Add overflow for scrolling if needed
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
`

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`

export const CentrePanel = ({ data, interactionOver }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [itemList, setItemList] = useState({});

    useEffect(() => {
        const fetchInventory = async () => {
            const items = await fetch('http://localhost:3000/inventory/evan');
            const response = await items.json();
            setInventoryData(response.items);
        }

        const fetchItemList = async () => {
            const response = await fetch('./assets/items/item_list.json');
            const itemList = await response.json();
            setItemList(itemList);
        }


        fetchItemList();
        fetchInventory();
    }, []);

    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    }

    const inventoryItems = inventoryData.map(item => {
        const itemData = itemList[item.id];
        itemData.quantity = item.quantity;
        return itemData;
    });
    const inventoryComponents = inventoryItems.map(item => <InventoryItem itemData={item} />);

    return (
        <Overlay>
            <Store>
                <Inventory>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <InventoryContainer>
                                {inventoryComponents}
                            </InventoryContainer>
                        </Grid>
                    </Grid>
                </Inventory>
                <RequestPanel data={data} />
            </Store>
            <button className="button" onClick={closeButtonClicked}>Close Panel</button>
        </Overlay>
    );
};