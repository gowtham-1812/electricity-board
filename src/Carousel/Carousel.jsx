import React from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

function Carousel() {
    const navigate = useNavigate();
    return(
        <div>
            <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Bill Payment" aria-current="true"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="New Connection"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Customer Support"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/bill-payment-4.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Bill payment" />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>Pay Bills & Check Status</h1>
                                <p>Instant online payments and real-time bill status updates</p>
                                <div className="d-flex gap-2">
                                    <a className="btn btn-lg btn-primary" onClick={() => navigate("/bill-calculation")}>Pay Now</a>
                                    <a className="btn btn-lg btn-outline-light" onClick={() => navigate("/service-status")}>Check Status</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-item">
                        <img src="/images/new-conn-house.avif" className="bd-placeholder-img" width="100%" height="100%" alt="New connection" />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>New Electricity Connection</h1>
                                <p>Fast and hassle-free new connections with transparent pricing</p>
                                <a className="btn btn-lg btn-primary" href="/new-connection">Apply Now</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-item">
                        <img src="/images/customer-supp-4.webp" className="bd-placeholder-img" width="100%" height="100%" alt="Customer support" />
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1>24/7 Customer Support</h1>
                                <p>We're here to help with all your electricity needs</p>
                                <div className="d-flex gap-2 justify-content-end">
                                    <a className="btn btn-lg btn-primary" href="/contact">Contact Us</a>
                                    <a className="btn btn-lg btn-outline-light" href="/faq">FAQs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;