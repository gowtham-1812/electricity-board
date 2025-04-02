import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Carousel from "./Carousel/Carousel_map.jsx";
import "./App.css";
import BillCalculator from "./BillCalculator.jsx";

function App() {
    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            
            {/* <div className="test">
                <label>Name</label>
                <TextBox onChange={setName} />

                <label>About</label>
                <TextArea onChange={setAbout} />

                <p>Your Name: {name}</p>
                <p>About: {about}</p>
            </div> */}

            <BillCalculator></BillCalculator>
        </div>
    );
}

export default App;