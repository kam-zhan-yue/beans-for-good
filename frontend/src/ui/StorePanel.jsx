import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { StoreItem } from './StoreItem';
import { Grid } from "@material-ui/core";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const StoreGrid = styled(Grid)`

`

const Store = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 50vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 500px; // Adjust max height here
`

const StoreListingContainer = styled.div`
    width: 100%;
    max-height: 400px;
    overflow: auto; // Add overflow for scrolling if needed

    border: 16px solid transparent;
    border-image: url(./assets/ui/panel-background.png) 3 fill repeat;
`

const ItemDisplay = styled.div`
    width: 100%;
    height: 60%;
    min-height: 200px;
    border: 16px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 3 fill repeat;
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
                <Container>
                    <Row>
                        <Col xs={8} lg={8}>
                            <StoreListingContainer>
                                {storeComponents}
                            </StoreListingContainer>
                        </Col>
                        <Col xs={4} lg={4}>
                            <ItemDisplay>

                            </ItemDisplay>
                        </Col>
                    </Row>
                </Container>
                    {/* <StoreListingContainer>
                        {storeComponents}
                    </StoreListingContainer>
                    <ItemDisplay>

                    </ItemDisplay> */}
                {/* </StoreGrid> */}
            </Store>
            <CloseButton src='./assets/ui/close-button.png' onClick={()=>closeButtonClicked()}></CloseButton>
        </Overlay>
    );
};