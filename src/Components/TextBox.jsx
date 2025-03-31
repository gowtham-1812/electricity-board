import React, { useState } from "react";
import "./Components.css";

function TextBox({ onChange }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
        onChange(e.target.value);
    }

    return (
        <div>
            <input type="text" className="textbox" value={input} onChange={handleChange} />
        </div>
    );
}

export default TextBox;