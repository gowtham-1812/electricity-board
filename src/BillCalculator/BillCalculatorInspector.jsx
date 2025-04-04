import React, { useState } from "react";
import "./BillCalculatorInspector.css";

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

const InspectorBillCalculator = () => {
  // Mock user data
  // const mockUsers = [
  //   {
  //     id: 1,
  //     consumerNo: "CON123456",
  //     name: "John Doe",
  //     mobile: "9876543210",
  //     address: "123 Main St, Cityville",
  //     meterNumber: "MTR789012",
  //     previousReading: 1250,
  //   },
  //   {
  //     id: 2,
  //     consumerNo: "CON654321",
  //     name: "Jane Smith",
  //     mobile: "8765432109",
  //     address: "456 Oak Ave, Townsville",
  //     meterNumber: "MTR210987",
  //     previousReading: 1875,
  //   },
  // ];
  // const mockHistory = {
  //   CON123456: [
  //     { readingDate: "2023-01-15", unitsConsumed: 120, amount: 420.0 },
  //     { readingDate: "2023-02-15", unitsConsumed: 135, amount: 472.5 },
  //     { readingDate: "2023-03-15", unitsConsumed: 110, amount: 385.0 },
  //   ],
  //   CON654321: [
  //     { readingDate: "2023-01-15", unitsConsumed: 150, amount: 525.0 },
  //     { readingDate: "2023-02-15", unitsConsumed: 175, amount: 612.5 },
  //     { readingDate: "2023-03-15", unitsConsumed: 160, amount: 560.0 },
  //   ],
  // };

  const [consumerNo, setConsumerNo] = useState("");
  const [user, setUser] = useState(null);
  const [calculation, setCalculation] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previousReading, setPreviousReading] = useState("");
  const [currentReading, setCurrentReading] = useState("");

  // Fetch User Data
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // // Simulated API delay
      // await new Promise((resolve) => setTimeout(resolve, 500));

      // // Mock verification
      // const foundUser = mockUsers.find((u) => u.consumerNo === consumerNo);

      if (!foundUser) {
        throw new Error("Consumer not found.");
      }

      setUser(foundUser);
      setPreviousReading(foundUser.previousReading);
      setCurrentReading("");

      // Mock history
      setHistory(mockHistory[foundUser.consumerNo] || []);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setCalculation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculation = () => {
    if (
      !previousReading ||
      !currentReading ||
      isNaN(parseInt(previousReading)) ||
      isNaN(parseInt(currentReading))
    ) {
      setError("Enter valid readings.");
      return;
    }

    const prev = parseInt(previousReading);
    const curr = parseInt(currentReading);

    if (curr < prev) {
      setError("Current reading must be greater than previous reading.");
      return;
    }

    const unitsConsumed = curr - prev;
    const amount = calculateTariff(unitsConsumed);

    setCalculation({
      previousReading: prev,
      currentReading: curr,
      unitsConsumed,
      amount,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    setError(null);
  };

  const calculateTariff = (units) => {
    if (units <= 100) return units * 3.5;
    if (units <= 200) return 100 * 3.5 + (units - 100) * 4.5;
    if (units <= 300) return 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.0;
    return 100 * 3.5 + 100 * 4.5 + 100 * 6.0 + (units - 300) * 7.5;
  };

  return (
    <div className="bill-calculator">
      <h2>Inspector Electricity Bill Panel</h2>

      {/* Consumer Verification */}
      <div className="verification-section">
        <h3>Search Consumer</h3>
        <input
          type="text"
          value={consumerNo}
          onChange={(e) => setConsumerNo(e.target.value)}
          placeholder="Enter Consumer Number"
        />
        <button onClick={fetchUser} disabled={!consumerNo || loading}>
          {loading ? "Fetching..." : "Find Consumer"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* User and Bill Information */}
      {user && (
        <div className="user-info-section">
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

      {/* Editable Readings */}
      {user && (
        <div className="calculation-section">
          <h3>Bill Calculation</h3>
          <div className="calculation-details">
            <label>
              <strong>Previous Reading:</strong>
            </label>
            <p>{previousReading}</p>

            <label>
              <strong>Current Reading:</strong>
            </label>
            <input
              type="number"
              value={currentReading}
              onChange={(e) => setCurrentReading(e.target.value)}
            />

            <button onClick={handleCalculation} disabled={loading}>
              {loading ? "Calculating..." : "Save Bill"}
            </button>

            {calculation && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}

      {/* Consumption History */}
      {history.length > 0 && (
        <div className="history-section">
          <h3>Consumption History</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={history.map((item) => ({
                date: new Date(item.readingDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
                units: item.unitsConsumed,
                amount: item.amount,
              }))}
            >
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
                name="Units"
                stroke="#8884d8"
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
  );
};

export default InspectorBillCalculator;
