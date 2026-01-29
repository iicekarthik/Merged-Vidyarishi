import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import EnquiryModal from "./EnquiryModal";

const ContactBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="contact-banner">
      <div className="contact-banner-box">
        {/* Decorative Gradients */}
        <div className="gradient-circle circle-left"></div>
        <div className="gradient-circle circle-right"></div>

        {/* Content */}
        <div className="contact-content">
          <h2>Connect with Amity Online University</h2>
          <p>
            Get all the support you need for your academic and career growth.
            Our team is ready to guide you through enrollment, courses, and more.
          </p>

          {/* Features Grid */}
          <div className="features-grid">
            <div className="feature"><span>✔</span> Expert Guidance</div>
            <div className="feature"><span>✔</span> Flexible Programs</div>
            <div className="feature"><span>✔</span> Global Recognition</div>
            <div className="feature"><span>✔</span> Career Support</div>
            <div className="feature"><span>✔</span> Affordable Fees</div>
            <div className="feature"><span>✔</span> Interactive Learning</div>

            {/* Button */}
            <div className="button-wrapper">
              <button onClick={() => setIsModalOpen(true)} className="call-btn">
                <IoCall /> Call Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ContactBanner;
