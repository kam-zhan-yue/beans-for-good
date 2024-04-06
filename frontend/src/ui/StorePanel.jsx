import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { StoreItem } from './StoreItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import constants from '../Constants';
import { PurchaseCompletePanel } from './PurchaseCompletePanel';
import { CookiesProvider, useCookies } from 'react-cookie'

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
    height: 57vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 600px; // Adjust max height here
    min-height: 450px;
`

const StoreNameContainer = styled.div`
    border: 16px solid transparent;
    border-image: url(./assets/ui/name-panel.png) 7.5 fill repeat;
    margin-bottom: 10px;

    /* Add transition for smooth animation */
    transition: transform 0.3s;
  
    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
      }
`

const StoreName = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: center; /* Align text to the right */
    color: ${constants.primary};
`

const StoreListingContainer = styled.div`
    width: 100%;
    height: 40vh;
    max-height: 400px;
    overflow: auto; // Add overflow for scrolling if needed
    min-height: 230px;

    border: 16px solid transparent;
    border-image: url(./assets/ui/panel-background.png) 3 fill repeat;
`

const ItemDisplayContainer = styled.div`
    display: flex; /* Use flexbox */
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
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
    width: auto; /* Adjust width to maintain aspect ratio */
    height: auto; /* Adjust height to maintain aspect ratio */
    width: 25vw;
    height: auto;
    max-width: 80%; /* Ensure the image doesn't exceed its container's width */
    max-height: 80%; /* Ensure the image doesn't exceed its container's height */
`

const PurchaseButton = styled.div`
    width: 100%;
    height: 8vh;
    border: 8px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 3 fill repeat;
    min-height: 75px;

    /* Add transition for smooth animation */
    transition: transform 0.3s;

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
    min-width: 10px;
    width: 50%; /* Adjust width to make it a square */
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
    const [itemList, setItemList] = useState({});
    const [facilityData, setFacilityData] = useState({});
    const [currentItem, setCurrentItem] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);

    const [purchaseButtonDisabled, setPurchaseButtonDisabled] = useState(false);
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    const [cookies, setCookie] = useCookies(['inventory', 'amount']);

    useEffect(() => {
        const fetchStoreItems = async () => {
            const items = await fetch(`http://localhost:3000/store/${data.facilityID}`);
            const response = await items.json();
            setStoreData(response.items);
        }

        const fetchItemList = async () => {
            const response = await fetch('./assets/items/item_list.json');
            const itemList = await response.json();
            setItemList(itemList);
        }

        const fetchFacilityList = async () => {
            const response = await fetch('./assets/config/facility_list.json');
            const facilityList = await response.json();
            const facilityData = facilityList[data.facilityID];
            setFacilityData(facilityData);
        }

        const fetchInventory = async () => {
            const items = await fetch('http://localhost:3000/inventory/evan');
            const response = await items.json();
            setInventoryData(response.items);
            // if (!cookies.inventory) {
            //     setCookie('inventory', [], { path: '/' });
            // }
            // setInventoryData(cookies.inventory);
        }

        fetchItemList();
        fetchFacilityList();
        fetchStoreItems();
        fetchInventory();
    }, []);

    const handleCompleteConfirmed = () => {
        setPurchaseComplete(false);
    }

    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    }

    const onItemClicked = (itemData) => {
        setCurrentItem(itemData);
    }

    const handlePurchase = async () => {
        if (currentItem == null)
            return;

        // Disable the purchase button
        setPurchaseButtonDisabled(true);

        console.log(`try purchase ${currentItem}`);
        try {
            // Simulate delay of 100ms
            // await new Promise(resolve => setTimeout(resolve, 500));
            const currentBeans = cookies.amount;

            if (currentBeans < currentItem.price) {
                throw new Error('Not enough beans');
            }

            setCookie('amount', currentBeans - currentItem.price, { "path": '/' });

            const newInventory = [...inventoryData];
            var inInventory = false;

            for (const item of newInventory) {
                if (item.id === currentItem.id) {
                    inInventory = true;
                    item.quantity += 1;
                    break;
                }
            }

            if (!inInventory) {
                const newItem = { ...currentItem };
                newItem.quantity = 1;
                newInventory.push(newItem);
            }

            // clean inventory to match database
            const cleanInventory = newInventory.map(item => {
                return {
                    "id": item.id,
                    "quantity": item.quantity
                };
            });

            console.log(JSON.stringify(cleanInventory));
            await fetch("http://localhost:3000/inventory/evan/purchase", {
                "method": "POST",
                "body": JSON.stringify(cleanInventory),
                "headers": {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            // setCookie("inventory", newInventory, { path: "/" });

            // Enable the purchase button and show the purchase complete panel
            setPurchaseButtonDisabled(false);
            setPurchaseComplete(true);
        } catch (error) {
            // If there's an error, enable the purchase button and display an error message
            console.error('Error purchasing item:', error);
            setPurchaseButtonDisabled(false);
        }
    }

    const handleStoreClicked = () => {
        if (facilityData) {
            window.open(facilityData.url, '_blank');
        }
    }

    const storeItems = storeData.map(item => {
        const itemData = itemList[item.id];
        itemData.price = item.price;
        itemData.id = item.id;
        return itemData;
    });
    const storeComponents = storeItems.map(item => <StoreItem onItemClicked={onItemClicked} itemData={item} />);

    return (
        <Overlay>
            {purchaseComplete &&
                <PurchaseCompletePanel
                    onConfirmed={handleCompleteConfirmed}
                    itemData={currentItem}
                />}
            {!purchaseComplete &&
                <>
                    <Store>
                        <Container>
                            <Row>
                                <Col>
                                    <StoreNameContainer onClick={handleStoreClicked}>
                                        <StoreName>{facilityData && facilityData.name}</StoreName>
                                    </StoreNameContainer>
                                </Col>
                            </Row>
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
                                                    <ItemDisplay src={assetURL + currentItem.sprite} />}
                                            </Col>
                                        </Row>
                                    </ItemDisplayContainer>

                                    {!purchaseButtonDisabled &&
                                        <PurchaseButton onClick={handlePurchase}>
                                            <Row className="align-items-center">
                                                <Col xs={8}>
                                                    <Price>
                                                        {currentItem && currentItem.price}
                                                        {currentItem === null && 0}
                                                    </Price>
                                                </Col>
                                                <Col xs={4}>
                                                    <Coin src='./assets/ui/coin.png' />
                                                </Col>
                                            </Row>
                                        </PurchaseButton>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Store>
                    <CloseButton src='./assets/ui/close-button.png' onClick={() => closeButtonClicked()}></CloseButton>
                </>}
        </Overlay>
    );
};