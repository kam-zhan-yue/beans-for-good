  import React, { forwardRef, useState, useImperativeHandle } from 'react';
  import styled from 'styled-components';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Container from "react-bootstrap/Container";
  import 'bootstrap/dist/css/bootstrap.css';

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

    &:hover {
      cursor: pointer;
      transform: translateY(-5px);
    }
  `

  const ItemImage = styled.img`
    width: 100%; /* Adjust width to make it a square */
    height: auto; /* Maintain aspect ratio */
  `

  const ItemName = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: left; /* Align text to the right */
    color: rgb(219, 219, 219);
  `


  const ItemPrice = styled.h1`
    font-family: "VT323", monospace;
    font-size: 50px; /* Adjust font size as needed */
    font-weight: 400;
    margin: 0; /* Remove default margin */
    text-align: right; /* Align text to the right */
    color: rgb(219, 219, 219);
  `

  const Coin = styled.img`
  width: 80%; /* Adjust width to make it a square */
  height: auto; /* Maintain aspect ratio */

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
                <Col xs={6}>
                    <ItemName>{itemData && itemData.name}</ItemName>
                </Col>
                <Col xs={2}>
                    <ItemPrice>{itemData && itemData.price}</ItemPrice>
                </Col>
                <Col xs={2}>
                    <Coin src='./assets/ui/coin.png' />
                </Col>
          </Row>
          </ItemBackground>
      );
  };