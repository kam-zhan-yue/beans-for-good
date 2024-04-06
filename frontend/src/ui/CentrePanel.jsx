import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { InventoryItem } from './InventoryItem';
import { RequestPanel } from './RequestPanel';
import { Grid } from "@material-ui/core";
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

const Centre = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 57vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 600px; // Adjust max height here
    min-height: 450px;
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

const DataContainer = styled.div`
width: 100%;
height: 40vh;
max-height: 400px;
overflow: auto; // Add overflow for scrolling if needed
min-height: 230px;

border: 16px solid transparent;
border-image: url(./assets/ui/panel-background.png) 3 fill repeat;
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

//EVAN'S STUFF

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
  overflow: auto;
`

const DonateButton = styled.div`
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

export const CentrePanel = ({ data, interactionOver }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [itemList, setItemList] = useState({});
    const [itemsToDonate, setItemsToDonate] = useState({});
    const [facilityData, setFacilityData] = useState({});

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
        if(facilityData)
        {
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
        const newObj = { ...itemsToDonate }
        if (newObj.hasOwnProperty(item.id)) {
            newObj[item.id].quantity += 1;
        } else {
            newObj[item.id] = { "quantity": 1 };
        }
        console.log(newObj);
        setItemsToDonate(newObj);
    };

    const donateItems = () => {
        setItemsToDonate({});
    };

    const inventoryItems = inventoryData.map(item => {
        const itemData = itemList[item.id];
        itemData.quantity = item.quantity;
        itemData.id = item.id;
        return itemData;
    });
    const inventoryComponents = inventoryItems.map(item => <InventoryItem itemData={item} onItemClicked={addToItemsToDonate} />);

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
                                            <RequestPanel data={data} />
                                        </InventoryContainer>
                                    </Grid>
                                </Grid>
                            </DataContainer>
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

<CloseButton src='./assets/ui/close-button.png' onClick={()=>closeButtonClicked()}></CloseButton>        </Overlay>
    );
};