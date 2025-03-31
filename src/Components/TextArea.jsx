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
            <textarea className="text-area" value={input} onChange={handleChange} />
        </div>
    );
}

export default TextArea;