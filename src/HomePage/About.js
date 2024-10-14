import React from "react";
import "./About.css"; // External styling for custom design

const AboutSection = () => {
  return (
    <section className="about-section py-5" id="about-us">
      <div className="container text-center">
        <h2 className="about-title mb-4">About Us</h2>
        <p className="lead about-description">
          At Unstop Techno Solutions, we merge cutting-edge digital marketing with robust manufacturing sector solutions into a single system. Our unified approach enhances order processing, ensures quality control, and offers real-time tracking for better transparency.
        </p>
        <p className="about-description mb-4">
          As a leading provider of PLM (Product Lifecycle Management) solutions and digital marketing services, we help manufacturers enhance their product offerings, boost revenue, and optimize business operations. Our team offers a wide range of services tailored to simplify workflows and drive measurable results in both fields.
        </p>
        <a href="#services" className="btn btn-primary mt-4">Learn More</a>
      </div>
    </section>
  );
};

export default AboutSection;
