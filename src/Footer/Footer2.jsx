import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer2.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Bill Payments</a></li>
                            <li><a href="#">New Connections</a></li>
                            <li><a href="#">Complaints</a></li>
                            <li><a href="#">Service Status</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>123 Energy Street</li>
                            <li>Power City, PC 12345</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: info@electriccompany.com</li>
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