import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import './App.scss';
import FlightInquiry from './pages/FlightInquiry';
import FlightListing from './pages/FlightListing';
import Cabin from './pages/Cabin';
import Header from './components/Header';

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    const customClass = pathname === "/" ? "home-body" : "body";
    document.body.classList=customClass;
  }, [pathname]);
  
  return (
  <div>
      <Header />
      <Routes>
        <Route path="/" exact element={<FlightInquiry />} />
        <Route path="/ucus-listeleme" exact element={<FlightListing />} />
        <Route path="/kabin" exact element={<Cabin />} />
      </Routes>
      </div>
  );
}

export default App;
