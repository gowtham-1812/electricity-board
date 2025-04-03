import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const menuItems = [
        {
            title: "Service Info", link: "#", 
            dropdown: [
                {name: "Pay Your Bills", link: "#"}, 
                {name: "Know Your Service Status", link: "#"}
            ] 
        },
        {
            title: "Customer Support", link: "#", 
            dropdown: [
                {name: "Register Mobile Number", link: "#"}, 
                {name: "Register Complaint", link: "#"}, 
                {name: "Newsletter", link: "#"}
            ] 
        },
        {
            title: "Connection", link: "#", 
            dropdown: [
                {name: "Apply for New Connection", link: "#"}, 
                {name: "Apply for Low Tension", link: "#"}, 
                {name: "Pricing", link: "#"}
            ] 
        }
        // FAQs
    ];

    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container-fluid custom-container">
                <div className="d-flex align-items-center gap-3">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    <a href="#" className="navbar-brand">
                        <img src="/vite.svg" alt="Logo" width="30" height="30" className="me-2" />
                    </a>
                </div>

                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav main-menu">
                        {menuItems.map((item, index) => (
                            <li className="nav-item dropdown" key={index}>
                                <a href={item.link} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    {item.title}
                                </a>
                                
                                {item.dropdown && (
                                    <ul className="dropdown-menu">
                                        {item.dropdown.map((subItem, index) => (
                                            <li key={index}>
                                                <a className="dropdown-item" href={subItem.link}>{subItem.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center">
                        <a onClick={() => navigate("/login")} className="btn login-btn">Login</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;