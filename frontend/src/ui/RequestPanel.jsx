import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { RequestItem } from './RequestItem'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import constants from '../Constants';

export const RequestPanel = ({ data }) => {
    const [requestedItemData, setRequestedItemData] = useState([]);
    const [itemList, setItemList] = useState({});

    useEffect(() => {
        const fetchRequestedItems = async () => {
            const items = await fetch(`./assets/dummy_${data.facilityID}.json`);
            const response = await items.json();
            setRequestedItemData(response.items);
        }

        const fetchItemList = async () => {
            const response = await fetch('./assets/items/item_list.json');
            const items = await response.json();
            console.log(items);
            setItemList(items);
        }

        fetchItemList();
        fetchRequestedItems();
        console.log(itemList);
    }, []);

    const requestedItems = requestedItemData.map(item => itemList[item]);
    console.log(itemList);
    console.log(requestedItems);
    const requestedItemComponents = requestedItems.map(item => <RequestItem itemData={item} />)

    return (
        <>
            {requestedItemComponents}
        </>
    );
}