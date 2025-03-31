import React, { useState } from "react";
import "./Components.css";

function TextArea({ onChange }) {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
        onChange(e.target.value);
    }

    return (
        <div>
            <textarea className="text-area" onChange={handleChange}>{input}</textarea>
        </div>
    );
}

export default TextArea;