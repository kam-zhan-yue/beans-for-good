import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem'
import { Grid } from "@material-ui/core";
import { CookiesProvider, useCookies } from 'react-cookie'

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
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

const CloseButton = styled.img`
  width: 80px;
  height: 80px;

  image-rendering: pixelated; /* Preserve image quality when scaled up */

  transition: 0.3s;
  -webkit-transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
`


export const InventoryPanel = ({ interactionOver }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [itemList, setItemList] = useState({});
    const [cookies, setCookie] = useCookies(['inventory']);


    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    }

    useEffect(() => {
        const fetchInventory = async () => {
            // const items = await fetch('http://localhost:3000/inventory/evan');
            // const response = await items.json();
            // setInventoryData(response.items);
            console.log(cookies.inventory);
            if (!cookies.inventory) {
                setCookie('inventory', [], { path: '/' });
            }
            setInventoryData(cookies.inventory);
        }

        const fetchItemList = async () => {
            const response = await fetch('./assets/items/item_list.json');
            const itemList = await response.json();
            setItemList(itemList);
        }


        fetchItemList();
        fetchInventory();
    }, []);

    const inventoryItems = inventoryData.map(item => {
        const itemData = itemList[item.id];
        itemData.quantity = item.quantity;
        return itemData;
    });
    const inventoryComponents = inventoryItems.map(item => <InventoryItem itemData={item} />);

    // Splitting items into groups of 5 for each row
    const rows = [];
    for (let i = 0; i < inventoryComponents.length; i += 5) {
        const rowItems = inventoryComponents.slice(i, i + 5);
        rows.push(rowItems);
    }

    return (
        <Overlay>
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
            <CloseButton src='./assets/ui/close-button.png' onClick={() => closeButtonClicked()}></CloseButton>
        </Overlay>
    );
};