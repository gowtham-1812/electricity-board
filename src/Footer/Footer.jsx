import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div>
            <div className="container">
                <footer className="pt-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Quick Pay</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Contact US</a></li>
                    </ul>
                    <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
                </footer>
            </div>
        </div>
    );
}

export default Footer;