import React from "react";


const Admissions = () => {
  return (
    <section id="admissions" className="admissions-section">
      <div className="admissions-container">
        <h2 className="admissions-heading">Admission Process</h2>
        <p className="admissions-subtitle">
          Getting started with{" "}
          <a
            href="https://vidyarishi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amity University Online
          </a>{" "}
          is simple. Follow these easy steps to secure your admission and begin
          your learning journey.
        </p>

        {/* Steps Grid */}
        <div className="admissions-grid">
          {/* Step 1 */}
          <div className="admissions-card">
            <div className="admissions-step">01</div>
            <h3 className="admissions-title">Register Online</h3>
            <p className="admissions-desc">
              Sign up on the admission portal with your basic details to create
              your student account.
            </p>
          </div>

          {/* Step 2 */}
          <div className="admissions-card">
            <div className="admissions-step">02</div>
            <h3 className="admissions-title">Fill Application</h3>
            <p className="admissions-desc">
              Complete the online application form with academic and personal
              information.
            </p>
          </div>

          {/* Step 3 */}
          <div className="admissions-card">
            <div className="admissions-step">03</div>
            <h3 className="admissions-title">Upload Documents</h3>
            <p className="admissions-desc">
              Submit scanned copies of required documents such as mark sheets,
              ID proof, and photographs.
            </p>
          </div>

          {/* Step 4 */}
          <div className="admissions-card">
            <div className="admissions-step">04</div>
            <h3 className="admissions-title">Pay Fees & Confirm</h3>
            <p className="admissions-desc">
              Pay the admission fees online and receive your confirmation along
              with student login details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
