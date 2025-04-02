import React, { useState, useEffect } from "react";
import "./BillCalculator.css"
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BillCalculator = () => {
  const [consumerNo, setConsumerNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [user, setUser] = useState(null);
  const [calculation, setCalculation] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentReading, setCurrentReading] = useState("");

  const fetchAndCalculate = async () => {
    try {
      setLoading(true);
      setError(null);

      // Verify consumer
      const verification = await axios.post(
        "http://localhost:5001/esb/verify-consumer",
        {
          consumerNo,
          mobile,
        }
      );

      if (!verification.data.verified) {
        throw new Error(
          "Verification failed. Please check your consumer number and mobile number."
        );
      }

      setUser(verification.data.user);

      const calcResponse = await axios.post(
        "http://localhost:5001/esb/calculate-bill",
        {
          consumerNo,
        }
      );

      setCalculation(calcResponse.data);
      setCurrentReading(calcResponse.data.currentReading.toString());

      const historyResponse = await axios.post(
        `http://localhost:5001/esb/reading-history`,
        {
          consumerNo,
        }
      );
      setHistory(historyResponse.data.readings);

    } 
    catch (err) 
    {
      setError(
        err.response?.data?.error || err.message || "Failed to process request"
      );
      setUser(null);
      setCalculation(null);
    } 
    finally 
    {
      setLoading(false);
    }
  };

  // const handleSubmitReading = async () => {
  //   if (!calculation || !currentReading || isNaN(parseInt(currentReading))) {
  //     setError("Please enter a valid current reading");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // const newReading = parseInt(currentReading);
  //     // const unitsConsumed = newReading - calculation.previousReading;


  //     // user bill calculator does not have have permissions to change all this
      
  //     // await axios.post("http://localhost:5001/esb/save-reading", {
  //     //   user: user,
  //     //   consumerNo: consumerNo,
  //     //   currentReading: currentReading,

  //     // });

  //     // await fetchAndCalculate();

  //   } 
  //   catch (err) 
  //   {
  //     setError(
  //       err.response?.data?.error || err.message || "Failed to save reading"
  //     );
  //   } 
  //   finally 
  //   {
  //     setLoading(false);
  //   }
  // };

  // const calculateTariff = (units) => {
  //   // Match the server-side calculation
  //   if (units <= 100) return units * 3.5;
  //   if (units <= 200) return 100 * 3.5 + (units - 100) * 4.5;
  //   if (units <= 300) return 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.0;
  //   return 100 * 3.5 + 100 * 4.5 + 100 * 6.0 + (units - 300) * 7.5;
  // };

  // Prepare chart data
  const chartData = history
    .map((item) => ({
      date: new Date(item.readingDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      units: item.unitsConsumed,
      amount: item.amount,
      status: item.paymentStatus,
    }))
    .reverse();

  if (calculation) {
    chartData.push({
      date: "Current",
      units: calculation.unitsConsumed,
      amount: calculation.amount,
      status: "pending",
    });
  }

  return (
    <div
      className="bill-calculator"
      style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}
    >
      <h2>Electricity Bill Calculator</h2>

      {/* Verification Form */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h3>Consumer Verification</h3>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Consumer Number:
          </label>
          <input
            type="text"
            value={consumerNo}
            onChange={(e) => setConsumerNo(e.target.value)}
            style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
            placeholder="Enter your consumer number"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Registered Mobile Number:
          </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ padding: "8px", width: "100%", maxWidth: "300px" }}
            placeholder="Enter registered mobile number"
          />
        </div>
        <button
          onClick={fetchAndCalculate}
          disabled={!consumerNo || !mobile || loading}
          style={{
            padding: "10px 15px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Verify & Calculate"}
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
            padding: "10px",
            background: "#ffeeee",
          }}
        >
          {error}
        </div>
      )}

      {/* User and Bill Information */}
      {user && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3>Consumer Information</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Consumer No:</strong> {user.consumerNo}
          </p>
          <p>
            <strong>Mobile:</strong> {user.mobile}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Meter Number:</strong> {user.meterNumber}
          </p>
        </div>
      )}

      {calculation && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3>Bill Calculation</h3>
          <div style={{ marginBottom: "15px" }}>
            <p>
              <strong>Previous Reading:</strong> {calculation.previousReading}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label style={{ marginRight: "10px" }}>
                <strong>Current Reading:</strong>
              </label>
              <p>{currentReading}</p>
            </div>
            <p>
              <strong>Units Consumed:</strong> {calculation.unitsConsumed}
            </p>
            <p>
              <strong>Amount Due:</strong> ₹{calculation.amount.toFixed(2)}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(calculation.dueDate).toLocaleDateString()}
            </p>
          </div>
          {/* <button
            onClick={handleSubmitReading}
            disabled={loading}
            style={{
              padding: "10px 15px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Reading"}
          </button> */}
        </div>
      )}

      {/* Consumption History */}
      {history.length > 0 && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Consumption History</h3>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={{
                padding: "8px 15px",
                background: "#607d8b",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {showHistory ? "Hide Chart" : "Show Chart"}
            </button>
          </div>

          {showHistory && (
            <div style={{ height: "400px", marginTop: "20px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="units"
                    name="Units Consumed"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="amount"
                    name="Amount (₹)"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillCalculator;