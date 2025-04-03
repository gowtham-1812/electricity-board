import React, { useState } from "react";
import "./RegisterComplaint.css";

const RegisterComplaint = () => {
    const [formData, setFormData] = useState({
        date: "",
        consumerNumber: "",
        summary: "",
        description: ""
    });

    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Complaint Submitted Successfully!");
            setFormData({
                date: "",
                name: "",
                consumerNumber: "",
                contactInfo: "",
                summary: "",
                description: ""
            });
        }
    };

    return (
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
                    <select id="issue-type" name="issue_type" class="form-control" required>
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
    );
};

export default RegisterComplaint;