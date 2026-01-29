import React, { useState } from "react";
import EnquiryForm from "../contact-details/EnquiryForm";
import EnquiryModal from "../contact-details/EnquiryModal";
import { FaDownload } from "react-icons/fa";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
    className="hero-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <section
      className="hero-section"
        style={{
          position: "relative",
          backgroundImage: "url('/images/Marketing/logo/amity.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          borderRadius: "0.75rem",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        {/* Overlay */}
        <div
        className="hero-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></div>

        {/* Content Wrapper */}
        <div
        className="hero-content"
          style={{
            display: "flex",
            justifycontent: "space-around",
            /* position: relative", */
            /* z-index: 10", */
            width: "100%",
            padding: "2.5rem 1rem",

            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <div
          className="hero-left"
            style={{
              color: "#fff",
              textAlign: "center",
              maxWidth: "42rem",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Empowering Education Through Online Learning
            </h2>
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Join{" "}
              <a
                href="https://vidyarishi.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff" }}
              >
                Amity University Online
              </a>{" "}
              and pursue globally recognized programs with flexibility,
              world-class faculty, and industry-relevant curriculum.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: "#FFCC00",
                  color: "#002147",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  transition: "background 0.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#facc15")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FFCC00")
                }
              >
                <FaDownload />
                Download Brochure
              </button>

              <a
                href="https://vidyarishi.com/amity-university"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#FFCC00",
                  color: "#002147",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  padding: "0.75rem 1.5rem",
                  fontSize: "1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "background 0.2s ease-in-out",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#facc15")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#FFCC00")
                }
              >
                Explore Courses
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div
            style={{
              borderRadius: "0.75rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "2rem",
              maxWidth: "28rem",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <EnquiryForm />
          </div>
        </div>

        {/* Modal */}
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </div>
  );
};

export default Hero;
