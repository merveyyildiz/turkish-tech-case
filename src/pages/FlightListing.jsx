import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import "./styles/FlightListing.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FlightsComponent from "../components/FlightsComponent";

export default function FlightListing() {
    const [flights, setFlights] = useState();
    const [isLoading, setIsLoading] = useState();
    const [pessenger, setPessenger] = useState(1);
    const [selectedPromosyon, setSelectedPromosyon] = useState(false);
    const promosyon = 0.5;

    useEffect(() => {
        let filterFlights = localStorage.getItem("flights");
        if (filterFlights) {
            filterFlights = JSON.parse(filterFlights);
        }
        setFlights(filterFlights);
        let pessenger = localStorage.getItem("passenger-count");
        if (pessenger) {
            setPessenger(+pessenger);
        }
        setIsLoading(false)
    }, [])

    const handleChange = (e) => {
        setSelectedPromosyon(e.nativeEvent.target.checked);
    }

    if (isLoading) {
        return (
            <p>Loading..</p>
        )
    }

    if (flights) {
        return (
            <Container className="flight-list-component">
                <Row className="justify-content-md-center">
                    <Col lg="9">
                        <span className="flight_ucus">Uçuş</span>
                        <h5 className="flight_title">{flights[0]?.originAirport.city.name} - {flights[0]?.destinationAirport.city.name}, {pessenger} Yolcu</h5>
                        <Form>
                            <span className="flight_code">Promosyon Kodu</span>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                className="flight_switch"
                                size={18}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form>
                        {
                            selectedPromosyon ? <div className="promosyon-text">
                                <p>Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini %{promosyon * 100} indirimle satın alabilirsiniz!</p>
                                <p>Promosyon Kodu seçeneği aktifken Eco Fly paketi harici seçim yapılamamaktadır.</p>
                            </div> : null
                        }
                    </Col>
                    <Col lg="9">
                        <FlightsComponent flights={flights} selectedPromosyon={selectedPromosyon} promosyon={promosyon} />
                    </Col>
                </Row>
            </Container>

        )
    }


}
