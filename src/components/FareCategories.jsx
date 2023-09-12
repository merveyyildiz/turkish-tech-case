import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";

export default function FareCategories({category, flight, index ,handleClick, selectedPromosyon, promosyon}) {
    let amount = flight.fareCategories[category].subcategories[0].price.amount;
    amount = selectedPromosyon ? amount * promosyon : amount;
    const currency = flight.fareCategories[category].subcategories[0].price.currency;
    return (
        <Col sx="3" className='flight_cell'>
            <Row className='flight_fare flight_fluid'>
                <Col> <Form.Check
                    type="radio"
                    id={`${category}-class`}
                    name="group1"
                    className='flight_radio'
                    label={category}
                    onClick={() => handleClick(category, index)}
                /></Col>
                <Col>
                    <p className='flight_gray-text'>Yolcu Başına</p>
                    <span className='flight_hour'><span className='pe-1'>{currency}</span>{amount}</span>
                </Col>
            </Row>
        </Col>
    )
}
