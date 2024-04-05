  import React, { forwardRef, useState, useImperativeHandle } from 'react';
  import styled from 'styled-components';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Container from "react-bootstrap/Container";
  import 'bootstrap/dist/css/bootstrap.css';

  const ItemBackground = styled(Container)`
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    // text-align: center;
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
    max-width: 10%;
    max-height: 100%;
  `

  const ItemPrice = styled.div`
    font-family: "VT323", monospace;
    font-size: 30px;
    font-weight: 400;
    position: absolute;
    bottom: -10px;
    right: -10px;
    z-index: 3;

    background-color: #00000090;

    padding: 5px;
    border-radius: 3px;

    color: rgb(219, 219, 219);
  `

  const Coin = styled.img`
  width: 80px;
  height: 80px;

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
          <Row>
            <Col>
              <ItemImage src={assetURL + itemData.sprite} />
            </Col>

            <Col>
            
            </Col>

            <Col>
              <Coin src='./assets/ui/coin.png'></Coin>
            </Col>
          </Row>
          </ItemBackground>
      );
  };