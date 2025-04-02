import React from "react";
import Navbar from "./Navbar/Navbar2.jsx";

import "./App.css";
import {Route, Routes} from "react-router-dom";
import BillCalculator from "./BillCalculator/BillCalculator.jsx";
import Home from "./Home/Home.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx"

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            
            <Routes>
                <Route path="/" element = { <Home/> } />
                <Route path="/home" element = { <Home/> } />
                <Route path="/bill-calculations" element = { <BillCalculator/> } />
                <Route path="/login" element = { <LoginPage /> } />
            </Routes>
            
        </div>
    );
}

export default App;