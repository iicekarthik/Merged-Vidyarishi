import React, { useEffect, useState } from "react";
import PrivacyFooter from "../termAndCondition/PrivacyFooter";
import { useScreenSize } from "@/hooks/screenSize";

const PrivacyAndPolicy = () => {
  const ScreenSize = useScreenSize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const BigScreenSize = ["xxl", "xl", "lg"].includes(ScreenSize);
  return (
    <>
      <div
        style={{
          padding: BigScreenSize ? "20px" : "20px",
          lineHeight: "1.6",
          fontFamily: "Arial, sans-serif",
          color: "#333",
          // backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start", // Fix: Start content from left
          textAlign: "justify",
          width: "90%", // Keeps it structured
          // maxWidth: "900px", // Prevents stretching on large screens
          margin: "35px auto", // Center the whole div horizontally
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#2c3e50",
            // marginBottom: "10px",
          }}
        >
          Privacy Policy
        </h1>

        <section
          style={{
            marginTop: "20px",
            textAlign: "justify", // Ensure content inside the section is justified
            padding: "30px 0 20px 0",
          }}
        >
          <p>
            At Vidyarishi, we prioritize your privacy. This Privacy Policy
            outlines how we collect, use, disclose, and protect your personal
            information when you use our services.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            1. Information We Collect
          </h2>
          <ul style={{ color: "#333" }}>
            <li>Name, email address, phone number</li>
            <li>Educational qualifications</li>
            <li>
              Government-issued identification (for verification purposes)
            </li>
            <li>Payment details (if applicable for course enrollment)</li>
          </ul>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            2. How We Use Your Information
          </h2>
          <ul style={{ color: "#333" }}>
            <li>Enroll you in online and distance learning programs</li>
            <li>Verify your identity and academic qualifications</li>
            <li>Process payments and transactions</li>
            <li>Provide customer support</li>
            <li>
              Send promotional and informational emails (you can opt-out at any
              time)
            </li>
          </ul>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            3. Information Sharing and Disclosure
          </h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information. However, we may share your data with:
          </p>
          <ul style={{ color: "#333" }}>
            <li>
              Partner universities and educational institutions for admission
              and verification purposes
            </li>
            <li>
              Third-party service providers (e.g., payment processors, customer
              support)
            </li>
            <li>Legal authorities if required by law</li>
          </ul>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            4. Data Protection and Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            information. However, no online data transmission is 100% secure.
            While we strive to protect your data, we cannot guarantee absolute
            security.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            5. Your Rights and Choices
          </h2>
          <ul>
            <li style={{ color: "#333" }}>
              Access, update, or delete your personal information
            </li>
            <li style={{ color: "#333" }}>
              Opt-out of marketing communications
            </li>
            <li style={{ color: "#333" }}>
              Request a copy of your stored data
            </li>
          </ul>

          <p style={{ color: "black" }}>
            For any requests, contact us at
            <p style={{ color: "black" }}>
              <b>support@vidyarishi.com</b>.
            </p>
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            6. Third-Party Links
          </h2>
          <p style={{ color: "black" }}>
            <strong>Vidyarishi.com</strong> may contain links to third-party
            websites. We are not responsible for their privacy practices and
            encourage you to review their policies.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            7. Changes to This Privacy Policy
          </h2>
          <p style={{ color: "black" }}>
            We may update this policy periodically. Changes will be posted on
            this page with the "Effective Date." Continued use of our services
            constitutes acceptance of the updated policy.
          </p>
        </section>
      </div>

      <PrivacyFooter title={"Privacy Policy"} />
    </>
  );
};

export default PrivacyAndPolicy;
