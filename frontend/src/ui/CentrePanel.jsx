import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';
import { SubInventoryItem } from './SubInventoryItem';
import { RequestPanel } from './RequestPanel';
import { Grid } from "@material-ui/core";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import constants from '../Constants';
import { CookiesProvider, useCookies } from 'react-cookie';

const Overlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`

const Centre = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 75vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 800px; // Adjust max height here
    min-height: 600px;
`

const CentreNameContainer = styled.div`
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

const CentreName = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: center; /* Align text to the right */
    color: ${constants.primary};
`

const RequestContainer = styled.div`
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    width: 100%;
    margin-top:10px;
    margin-bottom:10px;
`

const DataContainer = styled.div`
    width: 100%;
    height: 50vh;
    max-height: 400px;
    overflow: auto; // Add overflow for scrolling if needed
    min-height: 230px;

    border: 16px solid transparent;
    border-image: url(./assets/ui/panel-background.png) 3 fill repeat;
`

const DonateContainer = styled.div`
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    width: 100%;
    margin-top:10px;
`

const DonateBox = styled.div`
    width: 20%;
    height: 8vh;
    border: 8px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 3 fill repeat;
    min-height: 75px;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    margin: 0; /* Reset margin */
    padding: 0; /* Reset padding */
    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
    }
`

const DonateText = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: center; /* Align text to the right */
    color: ${constants.primary};
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

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  overflow: auto;
`

export const CentrePanel = ({ data, interactionOver }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [itemList, setItemList] = useState({});
    const [itemsToDonate, setItemsToDonate] = useState({});
    const [facilityData, setFacilityData] = useState({});
    const [cookies, setCookie] = useCookies(['inventory']);

    useEffect(() => {
        const fetchInventory = async () => {
            // const items = await fetch('http://localhost:3000/inventory/evan');
            // const response = await items.json();
            // setInventoryData(response.items);
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

        const fetchFacilityList = async () => {
            const response = await fetch('./assets/config/facility_list.json');
            const facilityList = await response.json();
            const facilityData = facilityList[data.facilityID];
            setFacilityData(facilityData);
        }

        fetchItemList();
        fetchFacilityList();
        fetchInventory();
    }, [data.facilityID]);

    //New functions
    const handleCentreClicked = () => {
        if (facilityData) {
            window.open(facilityData.url, '_blank');
        }
    }

    //Evan's functions

    const closeButtonClicked = () => {
        if (interactionOver instanceof (Function)) {
            interactionOver();
        }
    };

    const addToItemsToDonate = (item) => {
        console.log(item);
        const newObj = { ...itemsToDonate }
        const newInventory = [...inventoryData]
        var inventoryIndex = 0;

        for (var i = 0; i < newInventory.length; i++) {
            if (newInventory[i].id === item.id) {
                inventoryIndex = i;
                break;
            }
        }

        if (newObj.hasOwnProperty(item.id)) {
            newObj[item.id].quantity += 1;
        } else {
            newObj[item.id] = { "quantity": 1 };
        }

        newInventory[inventoryIndex].quantity -= 1;

        if (newInventory[inventoryIndex].quantity === 0) {
            newInventory.splice(inventoryIndex, 1);
        }

        setItemsToDonate(newObj);
        setInventoryData(newInventory);
    };

    const donateItems = () => {
        setCookie('inventory', inventoryData, { "path": '/' });
        setItemsToDonate({});
    };

    var inventoryItems;
    if (Object.keys(itemList).length === 0) {
        inventoryItems = [];
    } else {
        inventoryItems = inventoryData.map(item => {
            const itemData = itemList[item.id];
            itemData.quantity = item.quantity;
            itemData.id = item.id;
            return itemData;
        });
    }
    const inventoryComponents = inventoryItems.map(item => <SubInventoryItem itemData={item} onItemClicked={addToItemsToDonate} />);

    return (
        <Overlay>
            <Centre>
                <Container>
                    <Row>
                        <Col>
                            <CentreNameContainer onClick={handleCentreClicked}>
                                <CentreName>{facilityData && facilityData.name}</CentreName>
                            </CentreNameContainer>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <RequestContainer>
                                <RequestPanel data={data} />
                            </RequestContainer>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} lg={6}>
                            <DataContainer>
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
                            </DataContainer>
                        </Col>

                        <Col xs={6} lg={6}>
                            <DataContainer>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                >
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <InventoryContainer>
                                            {Object.keys(itemsToDonate).map(
                                                itemId => <SubInventoryItem itemData={{
                                                    "id": itemId,
                                                    "sprite": itemList[itemId].sprite,
                                                    "quantity": itemsToDonate[itemId].quantity
                                                }} />
                                            )}
                                        </InventoryContainer>
                                    </Grid>
                                </Grid>
                            </DataContainer>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            {Object.keys(itemsToDonate).length > 0 &&
                                <DonateContainer>
                                    <DonateBox onClick={donateItems}>
                                        <DonateText>
                                            Donate!
                                        </DonateText>
                                    </DonateBox>
                                </DonateContainer>}
                        </Col>
                    </Row>
                </Container>
            </Centre>
            {/* <Store>
                <Container>
                    <Row>
                        <Col xs={6} lg={6}>
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
                        </Col>
                        <Col xs={6} lg={6}>
                            <Row>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                >
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <InventoryContainer>
                                            <RequestPanel data={data} />
                                        </InventoryContainer>
                                    </Grid>
                                </Grid>
                            </Row>
                            <Row>
                                {Object.keys(itemsToDonate).map(
                                    itemId => <InventoryItem itemData={{
                                        "id": itemId,
                                        "sprite": itemList[itemId].sprite,
                                        "quantity": itemsToDonate[itemId].quantity
                                    }} />
                                )}
                                <DonateButton onClick={donateItems}>Donate</DonateButton>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Store> */}

            <CloseButton src='./assets/ui/close-button.png' onClick={() => closeButtonClicked()}></CloseButton>        </Overlay>
    );
};