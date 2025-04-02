import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Carousel from "./Carousel/Carousel_2.jsx";
import "./App.css";

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            <Carousel />
        </div>
    );
}

export default App;