import React from "react";
import "./Services.css";  // Custom CSS for grid and responsive styling

const Services = () => {
  return (
    <section className="services-section py-5">
      <div className="container">
        <h2 className="services-title mb-5 text-center">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-chart-line fa-3x service-icon"></i>
            <h4 className="service-title">SEO Optimization</h4>
            <p className="service-description">
              Increase traffic by utilizing professional SEO tactics and services.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-ad fa-3x service-icon"></i>
            <h4 className="service-title">Web Designing</h4>
            <p className="service-description">
              Build aesthetically pleasing, responsive, and user-friendly websites that captivate audiences.
            </p>
          </div>
          <div className="service-card">
            <i className="fas fa-users fa-3x service-icon"></i>
            <h4 className="service-title">Digital Marketing</h4>
            <p className="service-description">
              Expand your following with effective social media marketing outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
