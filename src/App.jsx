import React from "react";
import Navbar from "./Navbar/Navbar2.jsx";
import Carousel from "./Carousel/Carousel_2.jsx";
import CurrentUpdates from "./CurrentUpdates.jsx";
import Graphs from "./Graphs.jsx";
import "./App.css";

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            <Carousel />
            <div className="updates">
                <CurrentUpdates />
                <Graphs />
            </div>
        </div>
    );
}

export default App;