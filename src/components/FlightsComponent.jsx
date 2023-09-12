import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import "./styles/FlightsComponent.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SubCategories from './SubCategories';
import FareCategories from './FareCategories';

const fareCategory = [
    "ECONOMY",
    "BUSINESS"
]
const sortList = {
    "ECONOMY": "economy",
    "DEPARTURE": "departure"
}

export default function FlightsComponent({ flights, selectedPromosyon, promosyon }) {
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [selectedFlightIndex, setSelectedFlightIndex] = useState("");
    const [selectedFareCategories, setSelectedFareCategories] = useState("");
    const [flightsList, setFlightsList] = useState(flights);

    useEffect(() => {
        sortFlights(sortList.ECONOMY);
    },[])
    
    const handleClick = (value, index) => {
        if(value === selectedFareCategories && showSubCategories === true) {
            setShowSubCategories(false);
            return;
        }
        setSelectedFlightIndex(index);
        setSelectedFareCategories(value);
        setShowSubCategories(true);
    }

    const sortFlights = (value) => {
        let sortedFlights;
        if (value === sortList.ECONOMY) {
            sortedFlights = [...flightsList].sort(function (a, b) {
                return a.fareCategories.ECONOMY.subcategories[0].price.amount - b.fareCategories.ECONOMY.subcategories[0].price.amount;
            });
            setFlightsList(sortedFlights);
        } else if (value === sortList.DEPARTURE) {
            sortedFlights = [...flightsList].sort(function (a, b) {
                const first = a.arrivalDateTimeDisplay.replace(":", ".");
                const second = b.arrivalDateTimeDisplay.replace(":", ".");
                return first - second;
            });
            setFlightsList(sortedFlights);
        }
    }

    return (
        <div>
            <div className='flights-head d-flex justify-content-end align-items-center p-3 mt-3 text-light fs-6'>
                <span>Sıralama Kriteri</span>
                <Button variant="outline-light" onClick={() => sortFlights(sortList.ECONOMY)}>Ekonomi Ücreti</Button>
                <Button variant="outline-light" onClick={() => sortFlights(sortList.DEPARTURE)}>Kalkış Saati</Button>
            </div>
            <div className='flights-table p-3'>
                <Container>
                    {
                        flightsList?.map((flight, index) => (
                            <Row key={index}>
                                <Col xs="12" md="6" className='flight_cell'>
                                    <Row className='flight_fluid'>
                                        <Col xs="2" className='d-flex flex-column position-relative align-items-start'>
                                            <span className='flight_hour'>{flight.arrivalDateTimeDisplay}</span>
                                            <span className='flight_gray-text-bold'>{flight.originAirport.city.code}</span>
                                            <span className='flight_gray-text'>{flight.originAirport.city.name}</span>
                                        </Col>
                                        <Col xs="5" className='path'></Col>
                                        <Col xs="2" className='d-flex flex-column position-relative align-items-end'>
                                            <span className='flight_hour'>{flight.departureDateTimeDisplay}</span>
                                            <span className='flight_gray-text-bold'>{flight.destinationAirport.city.code}</span>
                                            <span className='flight_gray-text'>{flight.destinationAirport.city.name}</span>
                                        </Col>
                                        <Col xs="3" className='d-flex flex-column position-relative justify-content-center'>
                                            <span className='flight_gray-text-bold'>Uçuş Süresi</span>
                                            <span className='flight_hour'>{flight.flightDuration}</span>
                                        </Col>
                                    </Row>
                                </Col>

                                {
                                    fareCategory.map((category) => (
                                        <FareCategories key={category} category={category} flight={flight} index={index} handleClick={handleClick} selectedPromosyon={selectedPromosyon} promosyon={promosyon} />
                                    ))
                                }
                                {
                                    showSubCategories && selectedFlightIndex === index ?
                                        <Row className='flight_fluid'>
                                            <SubCategories flight={flight} selectedFareCategories={selectedFareCategories} selectedPromosyon={selectedPromosyon} promosyon={promosyon} />
                                        </Row> : null
                                }
                            </Row>
                        ))
                    }
                </Container>
            </div>
        </div>
    )
}
