import React, { useState, useEffect } from "react";
import "./Home.css";

function CurrentUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        // Sample data (Replace this with API data later)
        setUpdates([
            { id: 1, text: "Power outage scheduled for April 5th, 10 AM - 2 PM." },
            { id: 2, text: "New tariff rates effective from May 1st." },
            { id: 3, text: "Maintenance work in Sector 3 on April 8th." },
            { id: 4, text: "Renewable Energy(solar)- sucess stories" },
            { id: 5, text: "Negative Propaganda on media regarding EV charing station" },
          
        ]);
    }, []);

    return (
        <div className="updates-container">
            <h2>Current Updates</h2>
            <div className="updates-box">
                {updates.map(update => (
                    <div key={update.id} className="update-card">
                        {update.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CurrentUpdates;