import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Grid} from "@material-ui/core";

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

const assetsURL = './assets/'

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`



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
        const fetchInventory = async () => {
            const items = await fetch('http://localhost:3000/inventory/evan')
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
            <button className="button" onClick={closeButtonClicked}>Close Panel</button>
        </Overlay>
    );
};