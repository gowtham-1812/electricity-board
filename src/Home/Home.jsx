import React from "react";
import CurrentUpdates from "./CurrentUpdates.jsx";
import Graphs from "./Graphs.jsx";
import Carousel from "../Carousel/Carousel_2.jsx";


function Home()
{
    return (
        <div className="updates">
                <CurrentUpdates />
                <Graphs />
                <Carousel />
        </div> 
    )
}

export default Home;