import React, { useState } from "react";
import EnquiryModal from "../contact-details/EnquiryModal";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ padding: "1rem", paddingInline: "1.5rem" }}>
      <header
        style={{
          backgroundColor: "#002147",
          color: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src="/images/Marketing/logo/amitylogo.png"
              alt="Amity University Logo"
              style={{ height: "2.5rem" }}
            />
          </div>

          {/* Desktop CTA */}
          <nav style={{ display: "none", "@media(min-width:768px)": { display: "flex" } }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                backgroundColor: "#FFCC00",
                color: "#002147",
                fontWeight: "600",
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#facc15")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFCC00")}
            >
              <span>Enquire Now</span>
              <GoArrowRight style={{ fontSize: "1.125rem" }} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            style={{
              display: "block",
              fontSize: "1.5rem",
              outline: "none",
              border: "none",
              background: "transparent",
              color: "inherit",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu (slide-down) */}
        {isMenuOpen && (
          <div
            style={{
              backgroundColor: "#002147",
              padding: "0 1.5rem 1rem 1.5rem",
              animation: "slideDown 0.3s ease",
            }}
          >
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
              style={{
                width: "100%",
                backgroundColor: "#FFCC00",
                color: "#002147",
                fontWeight: "600",
                borderRadius: "9999px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#facc15")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFCC00")}
            >
              <span>Enquire Now</span>
              <GoArrowRight style={{ fontSize: "1.125rem" }} />
            </button>
          </div>
        )}
      </header>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Header;