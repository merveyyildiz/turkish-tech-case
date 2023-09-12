import React, {useState, useEffect} from "react";
import "./styles/FlightInquiry.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlaneArrival, faPlaneDeparture, faCalendarDays, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CabinSelection from "../components/CabinSelection";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import flightDatas from "../data/flights.json";
import Toast from 'react-bootstrap/Toast';

export default function FlightInquiry() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    },[])

    const onSubmit = (data) => {
        const origin = data.nereden.toLowerCase();
        const dest = data.nereye.toLowerCase();
        const filterFlights = flightDatas.flights.filter(flight => (
            flight.originAirport.city.name.toLowerCase() === origin && flight.destinationAirport.city.name.toLowerCase() === dest
        ))
        if (filterFlights.length > 0) {
            localStorage.setItem("flights", JSON.stringify(filterFlights));
            navigate("/ucus-listeleme");
        } else {
           setShowToast(true);
        }
    };

    return (
        <div className="inquiry text-center d-flex align-items-center flex-column">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="fs-2 fw-light mb-0"> Merhaba </p><p className="fs-3 fw-light mb-4"> Nereyi keşfetmek istersiniz?</p>
                <div className="form d-flex p-3">
                    <div className="form_input bg-white p-3 py-md-3 px-md-2 p-lg-3 d-flex d-md-block position-relative">
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                        <input className="border border-0 bg-white ps-2 fw-semibold" type="text" placeholder="Nereden" {...register("nereden", { required: true })} />
                        {errors.nereden && <span className="error-msg position-absolute d-block text-end bottom-0 ms-4">Bu alan zorunludur</span>}
                    </div>
                    <div className="form_input bg-white p-3 py-md-3 px-md-2 p-lg-3 d-flex d-md-block position-relative">
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        <input className="border border-0 bg-white ps-2 fw-semibold" type="text" placeholder="Nereye" {...register("nereye", { required: true })} />
                        {errors?.nereye && <span className="error-msg position-absolute d-block text-end bottom-0 ms-4">Bu alan zorunludur</span>}
                    </div>
                    <div className="form_date p-3 py-md-3 px-md-2 p-lg-3 text-light">
                        <span className="pe-3 fw-semibold">Tarih</span>
                        <FontAwesomeIcon icon={faCalendarDays} className="text-white-50"/>
                    </div>
                    <CabinSelection />
                    <button className="form_sumbit-btn border-0 text-white px-3" type="submit">
                        <FontAwesomeIcon icon={faChevronRight} size="xl" />
                    </button>
                </div>
            </form>
            <Toast show={showToast} onClose={()=> setShowToast(false)}  delay={3000}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Hata!</strong>
          </Toast.Header>
          <Toast.Body>Uçuş bulunamadı!</Toast.Body>
        </Toast>
        </div>
    )
}
