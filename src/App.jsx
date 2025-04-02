import React from "react";
import Navbar from "./Navbar/Navbar2.jsx";
import Carousel from "./Carousel/Carousel_2.jsx";
import CurrentUpdates from "./Home/CurrentUpdates.jsx";
import Graphs from "./Home/Graphs.jsx";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import BillCalculator from "./BillCalculator/BillCalculator.jsx";

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            <Carousel />
            <Routes>
                <Route path="/" element = { <Home/> } />
                <Route path="/home" element = { <Home/> } />
                <Route path="/bill-calculations" element = { <BillCalculator/> } />
            </Routes>
            {/* <div className="updates">
                <CurrentUpdates />
                <Graphs />
            </div> */}
        </div>
    );
}

export default App;