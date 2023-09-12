import React, { useState } from "react";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPerson, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./styles/CabinSelection.scss";

export default function CabinSelection() {
    const [passengerCount, setpassengerCount] = useState(1);
    const [cabinSelection, setCabinSelection] = useState("economy");
    const [peopleIcon, setPeopleIcon] = useState(faPerson);

    const handleClick = (value) => {
        let count = passengerCount;
        if (value === "desc") {
            count = count - 1;
            if (count === 1 || count === 0) {
                count = 1;
                setPeopleIcon(faPerson)
            }
        } else if (value === "inc") {
            count = count + 1;
            if (count === 2) {
                setPeopleIcon(faPeopleGroup);
            }
        }
        setpassengerCount(count);
        localStorage.setItem("passenger-count", count.toString());
    }

    const handleChange = (value) => {
        setCabinSelection(value);
        localStorage.setItem("cabin-selection", value);
    }

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover>
                <h6 className="popover-title">Kabin ve yolcu seçimi</h6>
                <Popover.Body>
                    <div className="radio-button d-flex">
                        <Form.Check
                            type="radio"
                            id={`economy-class`}
                            name="group1"
                            className="popover-radio"
                            label={`Ekonomy Class`}
                            checked={cabinSelection === "economy"}
                            onChange={() => handleChange("economy")}
                        />
                        <Form.Check
                            type="radio"
                            id={`business-class`}
                            name="group1"
                            className="popover-radio"
                            label={`Business Class`}
                            checked={cabinSelection === "business"}
                            onChange={() => handleChange("business")}
                        />
                    </div>
                    <div className="popover-selection d-flex justify-content-between mt-4">
                        <p className="fw-bold text-dark">Yolcu</p>
                        <div className="button-group">
                            <button type="button" className="border text-dark px-3 py-1 rounded rounded-1 .bg-body-secondary" onClick={() => handleClick("desc")}>-</button>
                            <span className="my-0 mx-3">{passengerCount}</span>
                            <button className="border text-dark px-3 py-1 rounded rounded-1 .bg-body-secondary" onClick={() => handleClick("inc")}>+</button>
                        </div>
                    </div>
                </Popover.Body>
            </Popover>
        }>
            <button type="button" className="form_person position-relative text-light border-0 py-3 py-md-0"> <span className="form_person-number position-absolute fw-semibold fs-6">{passengerCount}</span>
                <FontAwesomeIcon icon={peopleIcon} className="form_person-icon text-white-50"/></button>
        </OverlayTrigger>

    )
}