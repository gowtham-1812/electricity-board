
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConnectionsPage.css";

const ConnectionsPage = () => {
  const [connections, setConnections] = useState([]);
  const [consumerId, setConsumerId] = useState(""); // Consumer ID input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch connections for a consumer
  const fetchConnections = async () => {
    if (!consumerId) {
      setError("Please enter a valid Consumer ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5001/connections", {
        params: { consumerId },
      });
      setConnections(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch connections");
    } finally {
      setLoading(false);
    }
  };

  const deleteConnection = async (connid) => {
    try {
      await axios.put(`http://localhost:5001/connections/${connid}`);
      setConnections(connections.filter((conn) => conn.connid !== connid));
    } catch (err) {
      console.error(err);
      setError("Failed to delete connection");
    }
  };

  return (
    <div className="connections-page">
      <h1>Manage Connections</h1>
      <div className="consumer-id-input">
        <input
          type="text"
          placeholder="Enter Consumer ID"
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
        />
        <button onClick={fetchConnections} disabled={loading}>
          {loading ? "Loading..." : "Fetch Connections"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <table className="connections-table">
        <thead>
          <tr>
            <th>Connection ID</th>
            <th>Issued Date</th>
            <th>Terminated</th>
            <th>Terminated Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((conn) => (
            <tr key={conn.connid}>
              <td>{conn.connid}</td>
              <td>{conn.issuedDate}</td>
              <td>{conn.terminated ? "Yes" : "No"}</td>
              <td>{conn.terminatedDate || "N/A"}</td>
              <td>
                {!(conn.terminated) ? (
                  <button
                    className="delete-btn"
                    onClick={() => deleteConnection(conn.connid)}
                  >
                    Delete
                  </button>
                ) : (
                  "Inactive"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConnectionsPage;