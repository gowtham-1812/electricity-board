import React from "react";
import "./Navbar.css";

const Navbar = () => {
    const menuItems = [
        // { title: "", link: "", dropdown: [{name: "", link: ""}]}
        {
            title: "Service Info", link: "#", 
            dropdown: [{name: "Know Your Sector", link: "#"}, {name: "Know Your Service Status", link: "#"}] 
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
            title: "New Connection", link: "#", 
            dropdown: [
                {name: "Apply Online", link: "#"}, 
                {name: "Apply for Low Tension", link: "#"}, 
                {name: "Pricing", link: "#"}
            ] 
        },
        {
            title: "Help", link: "#", 
            dropdown: [
                {name: "Power House Visit", link: "#"}, 
                {name: "FAQs", link: "#"}
            ] 
        },
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
            <div className="container">

                <div className="d-flex align-items-center gap-2">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <a href="#" className="navbar-brand">
                        <img src="/vite.svg" alt="Logo" width="30" height="30" />
                    </a>
                </div>

                <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
                    <ul className="navbar-nav">
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
                </div>

                <form className="d-flex d-none d-md-block" role="search">
                    <input type="search" className="form-control me-2" placeholder="Search..." aria-label="Search" />
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
