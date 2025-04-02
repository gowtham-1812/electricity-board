import React from "react";
import CurrentUpdates from "./CurrentUpdates.jsx";
import Graphs from "./Graphs.jsx";
import Carousel from "../Carousel/Carousel_2.jsx";



function Home()
{
    return (
        <>
            <Carousel />
            <div className="updates">
                    <CurrentUpdates />
                    <Graphs />
            </div> 
        </>
    )
}

export default Home;