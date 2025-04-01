import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import TextBox from "./Components/TextBox.jsx";
import TextArea from "./Components/TextArea.jsx"
import "./App.css";
import Carousel from "./Components/Carousel.jsx";

function App() {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            <Carousel />
        </div>
    );
}

export default App;