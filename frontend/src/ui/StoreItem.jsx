  import React, { forwardRef, useState, useImperativeHandle } from 'react';
  import styled from 'styled-components';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Container from "react-bootstrap/Container";
  import 'bootstrap/dist/css/bootstrap.css';
  import constants from '../Constants';

  const ItemBackground = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
    position: relative;
    border: 16px solid transparent;
    border-image: url(./assets/ui/inventory-item-background.png) 7.5 fill repeat;

    margin:10px;
    width: 90%;
    height: 100px;
    max-height: 70px;

    /* Add transition for smooth animation */
    transition: transform 0.3s;
  
    &:hover {
      cursor: pointer;
      transform: translateY(-5px);
    }
  `

  const ItemImage = styled.img`
    width: 90%; /* Adjust width to make it a square */
    min-width:40px;
    height: auto; /* Maintain aspect ratio */
    margin-left:-20px;
  `

  const PriceHolder = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: flex-end;
  // margin-right:30px;
  `

  const ItemName = styled.h1`
    font-family: "VT323", monospace;
    font-size: 40px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: left; /* Align text to the right */

    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide any overflow text */
    text-overflow: ellipsis; /* Display ellipsis for truncated text */
    color: ${constants.primary}
  `


  const ItemPrice = styled.h1`
    font-family: "VT323", monospace;
    font-size: 30px; /* Adjust font size as needed */
    font-weight: 400;
    margin-right: 10px;
    text-align: right; /* Align text to the right */
    margin-top: 5px;
    color: ${constants.primary}
  `

  const Coin = styled.img`
  min-width: 30px;
  image-rendering: pixelated; /* Preserve image quality when scaled up */
`

  const assetURL = './assets/items/'

  export const StoreItem = ({ onItemClicked, itemData }) => {
      const handleClick = () => {
        if (onItemClicked) {
            onItemClicked(itemData); // Pass the itemData to the callback function
        }
    };
      return (
        <ItemBackground onClick={handleClick}>
        <Row className="align-items-center">
                <Col xs={2}>
                    <ItemImage src={assetURL + itemData.sprite} />
                </Col>
                <Col xs={8}>
                    <ItemName>{itemData && itemData.name}</ItemName>
                </Col>
                {/* <Col xs={2}>
                    <ItemPrice>{itemData && itemData.price}</ItemPrice>
                </Col> */}
                <Col xs={2}>
                  <PriceHolder>
                      <ItemPrice>{itemData && itemData.price}</ItemPrice>
                      <Coin src='./assets/ui/coin.png' />
                  </PriceHolder>
                </Col>
          </Row>
          </ItemBackground>
      );
  };