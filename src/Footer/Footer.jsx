import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#service">Services</a></li>
                            <li><a href="#contact-section">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column" id="service">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="/bill-calculation">Bill Payments</a></li>
                            <li><a href="/connections">New Connections</a></li>
                            <li><a href="/register-complaint">Complaints</a></li>
                            <li><a href="/service-status">Service Status</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column" id="contact-section">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>123 Energy Street</li>
                            <li>Power City, PC 12345</li>
                            <li><strong>Phone:</strong> +91 12345 67890</li>
                            <li>
                                <strong>Email:</strong> 
                                <a href="mailto:info@electriccompany.com"> info@electriccompany.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Electricity State Board. All Rights Reserved.</p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;