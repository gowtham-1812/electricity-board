import React, { useState, useEffect } from "react";
import "./RegisterComplaint.css";

const RegisterComplaint = () => {
    const [formData, setFormData] = useState({
        date: "",
        consumerNumber: "",
        summary: "",
        description: ""
    });

    const [errors, setErrors] = useState({});
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        if (!formData.date) newErrors.date = "Date of issue is required.";
        if (!formData.consumerNumber.match(/^\d+$/)) newErrors.consumerNumber = "Consumer number must be a valid integer.";
        if (!formData.summary.trim()) newErrors.summary = "Brief summary is required.";
        if (!formData.description.trim()) newErrors.description = "Detailed description is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const complaintData = {
                consumerNo: formData.consumerNumber,
                title: formData.summary,
                description: formData.description
                // No need to send date, backend sets it
            };

            try {
                const response = await fetch("http://localhost:5001/esb/add-complaint", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(complaintData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(`Complaint registered successfully! Complaint ID: ${result.complaintId}`);
                    setFormData({
                        date: "",
                        consumerNumber: "",
                        summary: "",
                        description: ""
                    });
                    setErrors({});
                } else {
                    alert(`Error: ${result.error}`);
                }

            } catch (err) {
                console.error("Submission error:", err);
                alert("An error occurred while submitting the complaint.");
            }
        }
    };

    const fetchComplaints = async () => {
        if (!formData.consumerNumber) {
            alert("Please enter a valid Consumer Number to fetch complaints.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:5001/complaints?consumerNo=${formData.consumerNumber}`
            );
            const data = await response.json();
            setComplaints(data);
        } catch (err) {
            console.error("Error fetching complaints:", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteComplaint = async (complaintId) => {
        try {
            await fetch(`http://localhost:5001/complaints/${complaintId}`, {
                method: "DELETE",
            });
            setComplaints(complaints.filter((complaint) => complaint.complaintid !== complaintId));
        } catch (err) {
            console.error("Error deleting complaint:", err);
            alert("Failed to delete complaint.");
        }
    };



    return (
        <>
            <div className="register-complaint-container">
                <h2>Register Complaint</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Date of Issue:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        {errors.date && <span className="error-message">{errors.date}</span>}
                    </div>

                    <div className="form-group">
                        <label>Consumer Number:</label>
                        <input type="text" name="consumerNumber" value={formData.consumerNumber} onChange={handleChange} />
                        {errors.consumerNumber && <p className="error">{errors.consumerNumber}</p>}
                    </div>

                    <div className="form-group">
                        <label for="issue-type">Select Issue Type:</label>
                        <select id="issue-type" name="issue_type" className="form-control" required>
                            <option value="" disabled selected>Choose an option</option>
                            <option value="billing">Electricity Bill Inquiry</option>
                            <option value="outage">Power Outage Report</option>
                            <option value="connection">New Connection Request</option>
                            <option value="safety">Safety Concern</option>
                            <option value="other">Other Issues</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Brief Summary:</label>
                        <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
                        {errors.summary && <p className="error">{errors.summary}</p>}
                    </div>

                    <div className="form-group">
                        <label>Detailed Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                        {errors.description && <p className="error">{errors.description}</p>}
                    </div>

                    <button type="submit" className="button">Submit Complaint</button>
                </form>

            </div>
            <div className="register-complaint-container">

                <h2>Existing Complaints</h2>
                <button onClick={fetchComplaints} className="button">
                    {loading ? "Loading..." : "Fetch Complaints"}
                </button>

                <table className="complaints-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date Issued</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <tr key={complaint.complaintid}>
                                <td>{complaint.complaintid}</td>
                                <td>{complaint.title}</td>
                                <td>{complaint.description}</td>
                                <td>{complaint.dateIssued}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteComplaint(complaint.complaintid)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RegisterComplaint;