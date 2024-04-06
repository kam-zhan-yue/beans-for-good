import React from 'react';
import styled from 'styled-components';
import constants from '../Constants';
import CurrencyPurchaseButton from './CurrencyPurchaseButton';
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

const Panel = styled.div`
    padding: 1vw; // Adjust padding here
    border: 16px solid transparent;
    border-image: url(./assets/ui/panel.png) 7.5 fill repeat;
    height: 20vh;
    min-width: 60vw;
    max-width: 60vw; // Adjust max width here
    max-height: 600px; // Adjust max height here
    display: flex;
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
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

export const CurrencyPanel = ({ interactionOver }) => {

    const handlePurchase = ((amount) => {
        console.log("purchase amount");
    });

  return (
    <Overlay>
        <Panel>
            <Container>
                <Row>
                    <Col>
                        <CurrencyPurchaseButton
                        amount ={100}
                        onClick={handlePurchase}/>
                    </Col>
                    <Col>
                        <CurrencyPurchaseButton
                        amount ={500}
                        onClick={handlePurchase}/>
                    </Col>
                    <Col>
                        <CurrencyPurchaseButton
                        amount ={1000}
                        onClick={handlePurchase}/>
                    </Col>

                </Row>
            </Container>
        </Panel>
            <CloseButton src='./assets/ui/close-button.png' 
            onClick={()=>interactionOver()}></CloseButton>
    </Overlay>
  );
};