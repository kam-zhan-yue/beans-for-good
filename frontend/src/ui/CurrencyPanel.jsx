import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import constants from '../Constants';
import CurrencyPurchaseButton from './CurrencyPurchaseButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import { CurrencyPurchaseCompletePanel } from './CurrencyPurchaseCompletePanel';
import { CookiesProvider, useCookies } from 'react-cookie';

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

    const [currentAmount, setCurrentAmount] = useState(0);
    const [closeButtonDisabled, setClosedButtonDisabled] = useState(false);
    const [purchaseAmount, setPurchaseAmount] = useState(0);
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    const [cookies, setCookie] = useCookies(['amount']);

    useEffect(() => {
        const fetchAmount = async () => {
            if (!cookies.amount) {
                setCookie('amount', 0, { path: '/' });
            }
            setCurrentAmount(cookies.amount);
        }

        fetchAmount();
    }, []);

    const handlePurchase = async (amount) => {
        // Disable the purchase button
        setClosedButtonDisabled(true);

        console.log(`try purchase ${amount}`);
        try {
            // Simulate delay of 100ms
            // await new Promise(resolve => setTimeout(resolve, 500));
            setCookie('amount', currentAmount + amount, { "path": '/' });
            setCurrentAmount(currentAmount + amount);
            setPurchaseAmount(amount);

            // Enable the purchase button and show the purchase complete panel
            setClosedButtonDisabled(false);
            setPurchaseComplete(true);
        } catch (error) {
            // If there's an error, enable the purchase button and display an error message
            console.error('Error purchasing item:', error);
            setClosedButtonDisabled(false);
        }
    }

    const handleCompleteConfirmed = () => {
        setPurchaseComplete(false);
    }
    return (
        <Overlay>
            {purchaseComplete &&
                <CurrencyPurchaseCompletePanel
                    onConfirmed={handleCompleteConfirmed}
                    amount={purchaseAmount}
                />}

            {!purchaseComplete &&
                <Panel>
                    <Container>
                        <Row>
                            <Col>
                                <CurrencyPurchaseButton
                                    amount={100}
                                    onClick={handlePurchase} />
                            </Col>
                            <Col>
                                <CurrencyPurchaseButton
                                    amount={500}
                                    onClick={handlePurchase} />
                            </Col>
                            <Col>
                                <CurrencyPurchaseButton
                                    amount={1000}
                                    onClick={handlePurchase} />
                            </Col>

                        </Row>
                    </Container>
                </Panel>}

            {!closeButtonDisabled && !purchaseComplete &&
                <CloseButton src='./assets/ui/close-button.png'
                    onClick={() => interactionOver()}></CloseButton>}
        </Overlay>
    );
};