import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { StoreItem } from './StoreItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import constants from '../Constants';

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const Store = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 50vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 500px; // Adjust max height here
    min-height: 300px;
`

const StoreListingContainer = styled.div`
    width: 100%;
    height: 40vh;
    max-height: 400px;
    overflow: auto; // Add overflow for scrolling if needed

    border: 16px solid transparent;
    border-image: url(./assets/ui/panel-background.png) 3 fill repeat;
`

const ItemDisplayContainer = styled.div`
    width: 100%;
    height: 30vh;
    min-height: 150px;
    border: 8px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 3 fill repeat;
    margin-bottom: 2vh;
`

const ItemDisplay = styled.img`
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    margin-top:10%;
    width: 60%;
    height: auto;
    max-width: 300px;
    max-height: 300px;
`

const PurchaseButton = styled.div`
    width: 100%;
    height: 8vh;
    border: 8px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 3 fill repeat;
    min-height: 75px;

    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
      }
`

const Price = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: right; /* Align text to the right */
    color: ${constants.primary};
`

const Coin = styled.img`
width: 80%; /* Adjust width to make it a square */
height: auto; /* Maintain aspect ratio */

image-rendering: pixelated; /* Preserve image quality when scaled up */
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
const assetURL = './assets/items/';

export const StorePanel = ({ data, interactionOver }) => {
    const [storeData, setStoreData] = useState([]);
    const [itemList, setItemList] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        const fetchStoreItems = async () => {
            const items = await fetch(`./assets/dummy_${data.facilityID}.json`);
            const response = await items.json();
            // console.log(response);
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

    const onItemClicked = (itemData) => {
        setCurrentItem(itemData);
    }
    
    const handlePurchase = () => {
        if(currentItem == null)
            return;
        console.log(`try purchase ${currentItem}`);
    }

    const storeItems = storeData.map(item => {
        const itemData = itemList[item.id];
        itemData.price = item.price;
        return itemData;
    });
    const storeComponents = storeItems.map(item => <StoreItem onItemClicked={onItemClicked} itemData={item} />);
    // console.log(storeItems);


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
                            <ItemDisplayContainer>
                                <Row className="align-items-center">
                                    <Col>
                                {currentItem && 
                                    <ItemDisplay src={assetURL + currentItem.sprite}/>}
                                    </Col>
                                </Row>
                            </ItemDisplayContainer>
                            <PurchaseButton onClick={handlePurchase}>

                            <Row className="align-items-center">
                                <Col xs={10}>
                                    <Price>
                                        {currentItem && currentItem.price}
                                        {currentItem === null && 0}
                                    </Price>
                                </Col>
                                <Col xs={2}>
                                    <Coin src='./assets/ui/coin.png' />
                                </Col>
                            </Row>
                            </PurchaseButton>
                        </Col>
                    </Row>
                </Container>
            </Store>
            <CloseButton src='./assets/ui/close-button.png' onClick={()=>closeButtonClicked()}></CloseButton>
        </Overlay>
    );
};