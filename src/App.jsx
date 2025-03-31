import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import TextBox from "./Components/TextBox.jsx";
import TextArea from "./Components/TextArea.jsx"
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    return(
        <div className="App" style={{ paddingTop: "70px" }}>
            <Navbar />
            
            <label>Name</label>
            <TextBox onChange={setName} />

            <label>About</label>
            <TextArea onChange={setAbout} />

            <p>Your Name: {name}</p>
            <p>About: {about}</p>
        </div>
    );
}

export default App;