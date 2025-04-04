import React, { useState } from "react";
import axios from "axios";
import "./ServiceStatusPage.css";

const ServiceStatusPage = () => {
  const [personId, setPersonId] = useState("");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchConnections = async () => {
    if (!personId) {
      setError("Please enter a valid Person ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5001/service-status", {
        params: { personId },
      });
      setConnections(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch connections.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-status-container">
      <h1>Service Status</h1>
      <div className="form-group">
        <label>Enter Person ID:</label>
        <input
          type="text"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          placeholder="Enter Person ID"
        />
        <button onClick={fetchConnections} disabled={loading}>
          {loading ? "Loading..." : "Fetch Connections"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {connections.length > 0 && (
        <table className="connections-table">
          <thead>
            <tr>
              <th>Connection ID</th>
              <th>Issued Date</th>
              <th>Terminated</th>
              <th>Terminated Date</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn) => (
              <tr key={conn.connid}>
                <td>{conn.connid}</td>
                <td>{conn.issuedDate}</td>
                <td>{conn.terminated ? "Yes" : "No"}</td>
                <td>{conn.terminatedDate || "N/A"}</td>
                <td>{conn.name}</td>
                <td>{conn.mobile}</td>
                <td>{conn.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceStatusPage;