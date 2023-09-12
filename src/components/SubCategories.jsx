import React from "react";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import "./styles/SubCategories.scss";

export default function SubCategories({ flight, selectedFareCategories, selectedPromosyon, promosyon }) {
    const promosyonBrandCode = "ecoFly";
    const navigate = useNavigate();

    const handleClick = (data) => {
        localStorage.setItem("status",data.status);
        const amount = selectedPromosyon && data.brandCode === promosyonBrandCode ? data.price.amount * promosyon : data.price.amount;
        const price = {
            currency: data.price.currency,
            amount
        }
        localStorage.setItem("price", JSON.stringify(price));
        navigate("/kabin")
    }
    return (
        <>
            {flight.fareCategories[selectedFareCategories].subcategories.map((data, index) => (
                <Col className="fly_container mt-2 mt-md-0 position-relative p-0 mx-1 border border-1" key={index}>
                    <Stack direction="horizontal" gap={3} className="fly_header fw-bold">
                        <div className="p-2">{data.brandCode}</div>
                        <div className="p-2 ms-auto  fly_price position-relative"><span className="position-absolute">{data.price.currency}</span>{selectedPromosyon && data.brandCode === promosyonBrandCode ? data.price.amount * promosyon : data.price.amount}</div>
                    </Stack>
                    <div className="fly_rights">
                        {data.rights.map((right, index) => (
                            <p key={index}>{right}</p>
                        ))}
                    </div>
                    <button type="button" className="fly_button" disabled={selectedPromosyon && data.brandCode !== promosyonBrandCode } onClick={()=>handleClick(data)}>Uçusu Seç</button>
                </Col>
            ))}
        </>
    )
}
