import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./styles/Cabin.scss";
import { Link } from "react-router-dom";

export default function Cabin() {
  const [status, setStatus] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const getStatus = localStorage.getItem("status");
    if (getStatus) {
      setStatus(getStatus);
    }

    let price = localStorage.getItem("price");
    if (price) {
      price = JSON.parse(price);
      setCurrency(price.currency);
    }

    let pessengerCount = localStorage.getItem("passenger-count");
    if (pessengerCount) {
      pessengerCount = +pessengerCount;
    }

    if (pessengerCount && price.amount) {
      setTotalAmount(pessengerCount * +price.amount);
    }
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" md="7">
          {
            status === "AVAILABLE" ? <div className="cabin">
              <div className="cabin_check pb-4">
                <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                <span className="cabin_mesg fw-bold">Kabin seçimi tamamlandı.</span>
              </div>
              <Stack direction="horizontal" gap={3} className="cabin_amount">
                <div className="p-2"><span className="fw-light">Toplam Tutar</span></div>
                <div className="p-2 ms-auto"><span className="price fw-semibold">{currency}</span><span className="price fw-semibold ms-1">{totalAmount}</span></div>
              </Stack>
            </div> :
              <div className="cabin">
                <div className="cabin_check error pb-4">
                  <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                  <span className="cabin_mesg fw-bold">Kabin seçimi tamamlanmadı.</span>
                </div>
                <Stack direction="horizontal" gap={3} className="cabin_amount">
                  <div className="p-2 ms-auto mt-4"><Link to="/" className="text-decoration-none fs-6" onClick={() => localStorage.clear()}>Başa Dön</Link></div>
                </Stack>
              </div>
          }
        </Col>
      </Row>
    </Container>
  )
}
