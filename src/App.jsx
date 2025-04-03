import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import BillCalculator from "./BillCalculator/BillCalculator.jsx";
import BillCalculatorInspector from "./BillCalculator/BillCalculatorInspector.jsx";
import Home from "./Home/Home.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import Footer from "./Footer/Footer.jsx";
import NewsLetter from "./NewsLetter/NewsLetter.jsx";
import RegisterMobileNumber from "./RegMobNo/RegisterMobileNumber.jsx";
import RegisterComplaint from "./RegisterComplaint/RegisterComplaint.jsx";
import "./App.css";

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            
            <Routes>
                <Route path="/" element = { <Home/> } />
                <Route path="/home" element = { <Home/> } />
                <Route path="/bill-calculation" element = { <BillCalculatorInspector /> } />
                <Route path="/login" element = { <LoginPage /> } />
                <Route path="/newsletter" element = { <NewsLetter /> } />
                <Route path="/register-mobile-number" element = { <RegisterMobileNumber /> } />
                <Route path="/register-complaint" element = { <RegisterComplaint/> } />
            </Routes>
            
            <Footer />
        </div>
    );
}

export default App;