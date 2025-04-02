import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import "./Home.css";

const initialData = [
    { year: "2015", value: 120 },
    { year: "2016", value: 150 },
    { year: "2017", value: 180 },
    { year: "2018", value: 210 },
    { year: "2019", value: 170 },
    { year: "2020", value: 230 },
    { year: "2021", value: 250 },
    { year: "2022", value: 290 },
];

function Graphs() {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState("");

    const filteredData = data.filter(item =>
        item.year.includes(search)
    );

    return (
        <div className="graph-container">
            <h2>Electricity Usage Over the Years</h2>

            {/* Search Input */}
           

            {/* Responsive Graph */}
            <ResponsiveContainer width="95%" height={350}>
                <AreaChart data={filteredData}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(219, 100%, 71%)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(219, 100%, 71%)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="value" stroke="#4a90e2" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Graphs;