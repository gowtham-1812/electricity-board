import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem("userType");
        setUserType(storedUserType);
    })

    const handleLogout = () => {
        localStorage.removeItem("userType");
        localStorage.removeItem("authToken");
        setUserType(null);
        navigate("login");
    }
    const menuItems = [
        {
            title: "Service Info", link: "#", 
            dropdown: [
                {name: "Pay Your Bills", link: "/bill-calculation"}, 
                {name: "Know Your Service Status", link: "/service-status"}
            ] 
        },
        {
            title: "Customer Support", link: "#", 
            dropdown: [
                {name: "Register Mobile Number", link: "/register-mobile-number"}, 
                {name: "Register Complaint", link: "/register-complaint"}, 
                {name: "Newsletter", link: "/newsletter"}
            ] 
        },
        {
            title: "Connection", link: "#", 
            dropdown: [
                {name: "Apply for New Connection", link: "/connections"}, 
                // {name: "Apply for Low Tension", link: "#"}, 
                {name: "Pricing", link: "#"}
            ] 
        },
        // { title: "Connection", link: "#" },
        { title: "FAQs", link: "#" }
    ];

    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container-fluid custom-container">
                <div className="d-flex align-items-center gap-3">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    <a href="/" className="navbar-brand">
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
                    {(userType) ? (
                        <span className={`nav-bar-button-side-text ${userType === "inspector" ? "inspector" : ""}`}>
                            {userType.toString().toUpperCase()}
                        </span>
                    ) : null}
                    {userType ? (
                            <button onClick={handleLogout} className="btn logout-btn">Logout</button>
                        ) : (
                            <a onClick={() => navigate("/login")} className="btn login-btn">Login</a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;