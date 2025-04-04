import React, { useState, useEffect } from "react";
import "./ConsumerBillView.css";

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

const ConsumerBillView = () => {
    const [consumerNo, setConsumerNo] = useState("");
    const [user, setUser] = useState(null);
    const [billDetails, setBillDetails] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Fetch User Data
    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            setPaymentSuccess(false);

            // In a real app, this would be an API call
            // For demo, we'll simulate it
            const response = await fetch("http://localhost:5001/esb/verify-consumer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    consumerid: parseInt(consumerNo),
                    mobile: 9876543210, // In a real app, this would come from the user input
                }),
            });

            const data = await response.json();

            if (!data.verified) {
                throw new Error(data.message || "Consumer not found.");
            }

            setUser(data.user);

            // Fetch bill details
            const billResponse = await fetch("http://localhost:5001/esb/calculate-bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    consumerid: data.user.consumerNo,
                }),
            });

            const billData = await billResponse.json();
            if (billResponse.ok) {
                setBillDetails(billData);
            }

            // Fetch reading history
            const historyResponse = await fetch("http://localhost:5001/esb/reading-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    consumerid: data.user.consumerNo,
                }),
            });

            const historyData = await historyResponse.json();
            if (historyResponse.ok && historyData.readings) {
                setHistory(historyData.readings);
            }
        } catch (err) {
            setError(err.message);
            setUser(null);
            setBillDetails(null);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!billDetails || !user) return;

        setShowPaymentModal(true);
    };

    const processPayment = async () => {
        try {
            setPaymentProcessing(true);

            // Simulating payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mark bill as paid in backend
            const response = await fetch("http://localhost:5001/esb/mark-bill-paid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    billId: billDetails.billId,
                    consumerid: user.consumerNo
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPaymentSuccess(true);
                // Update the bill details to show as paid
                setBillDetails(prev => ({ ...prev, isPaid: true }));
            } else {
                throw new Error(data.message || "Payment failed");
            }
        } catch (err) {
            setError("Payment processing failed: " + err.message);
        } finally {
            setPaymentProcessing(false);
            setShowPaymentModal(false);
        }
    };

    return (
        <div className="bill-view">
            <h2>Electricity Bill Portal</h2>

            <div className="verification-section">
                <h3>View Your Bill</h3>
                <div className="verification-input-group">
                    <input
                        type="text"
                        value={consumerNo}
                        onChange={(e) => setConsumerNo(e.target.value)}
                        placeholder="Enter Consumer Number"
                    />
                    <button onClick={fetchUser} disabled={!consumerNo || loading}>
                        {loading ? "Fetching..." : "Find Bill"}
                    </button>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {paymentSuccess && (
                <div className="success-message">
                    Payment processed successfully! Thank you.
                </div>
            )}

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

            {/* Bill Details (Read-only) */}
            {billDetails && (
                <div className="bill-section">
                    <h3>Bill Details</h3>
                    <div className="bill-details">
                        <div className="detail-row">
                            <span className="detail-label">Previous Reading:</span>
                            <span className="detail-value">{billDetails.previousReading}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Current Reading:</span>
                            <span className="detail-value">{billDetails.currentReading}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Units Consumed:</span>
                            <span className="detail-value">{billDetails.unitsConsumed}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Amount Due:</span>
                            <span className="detail-value">₹{billDetails.amount.toFixed(2)}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Bill Date:</span>
                            <span className="detail-value">
                                {new Date(billDetails.issuedDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Due Date:</span>
                            <span className="detail-value">
                                {new Date(billDetails.dueDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className={`detail-value status ${billDetails.isPaid ? "paid" : "unpaid"}`}>
                                {billDetails.isPaid ? "PAID" : "UNPAID"}
                            </span>
                        </div>

                        {!billDetails.isPaid && (
                            <button
                                className="pay-button"
                                onClick={handlePayment}
                                disabled={paymentProcessing}
                            >
                                Pay Bill Now
                            </button>
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

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="payment-modal-overlay">
                    <div className="payment-modal">
                        <h3>Payment Gateway</h3>
                        <div className="payment-details">
                            <p><strong>Amount:</strong> ₹{billDetails?.amount.toFixed(2)}</p>
                            <p><strong>Consumer No:</strong> {user?.consumerNo}</p>
                            <p><strong>Due Date:</strong> {new Date(billDetails?.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="payment-form">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" placeholder="1234 5678 9012 3456" disabled={paymentProcessing} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" disabled={paymentProcessing} />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input type="password" placeholder="***" disabled={paymentProcessing} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Cardholder Name</label>
                                <input type="text" placeholder="Name on card" disabled={paymentProcessing} />
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button
                                className="cancel-button"
                                onClick={() => setShowPaymentModal(false)}
                                disabled={paymentProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                className="process-button"
                                onClick={processPayment}
                                disabled={paymentProcessing}
                            >
                                {paymentProcessing ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsumerBillView;