import { useEffect, useState } from "react";
import PrivacyFooter from "../termAndCondition/PrivacyFooter";
import { useScreenSize } from "@/hooks/screenSize";

const RefundPolicyComp = () => {
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
            marginBottom: "10px",
          }}
        >
          Refund Policy
        </h1>
        {/* <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "10px",
            textAlign: "justify", // Ensure paragraph is justified
          }}
        >
          Last Updated :- 01-April-2025
        </p> */}

        <section
          style={{
            marginTop: "20px",
            textAlign: "justify", // Ensure content inside the section is justified
            padding: "30px 0 20px 0",
          }}
        >
          <p>
            At Vidyarishi, we strive to provide a seamless and transparent
            admission process for online and distance education programs.
            However, we understand that certain circumstances may require a
            refund request. Please read our refund policy carefully before
            proceeding with any transactions.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            1. Eligibility for Refund
          </h2>
          <p>
            Refund requests are considered under the following circumstances:
          </p>
          <ul style={{}}>
            <li style={{ color: "#333" }}>
              If the admission process is incomplete due to technical or
              administrative errors on our part.
            </li>
            <li style={{ color: "#333" }}>
              If the university partner rejects the application due to
              ineligibility.
            </li>
            <li style={{ color: "#333" }}>
              If the student wishes to withdraw before the admission is
              confirmed by the university.
            </li>
          </ul>
          <p>
            Once the admission has been confirmed and the university has issued
            enrollment credentials, no refund requests will be entertained
            except in cases of double payment or technical errors.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            2. Non-Refundable Cases
          </h2>
          <p>The following situations are not eligible for a refund:</p>
          <ul style={{}}>
            <li style={{ color: "#333" }}>
              If the student voluntarily withdraws after admission confirmation.
            </li>
            <li style={{ color: "#333" }}>
              If incorrect or misleading information is provided during
              registration.
            </li>
            <li style={{ color: "#333" }}>
              If the student fails to submit required documents within the
              stipulated timeline.
            </li>
            <li style={{ color: "#333" }}>
              If the university or course guidelines explicitly mention a
              non-refundable policy.
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
            3. Refund Request Process
          </h2>
          <p>To initiate a refund request, the student must:</p>
          <ul style={{}}>
            <li style={{ color: "#333" }}>
              Submit a written request via email to support@vidyarishi.com
              within 10 days of the payment date.
            </li>
            <li style={{ color: "#333" }}>
              Attach proof of payment and any relevant documents supporting the
              refund claim.
            </li>
            <li style={{ color: "#333" }}>
              Allow up to 10 business days for the request to be reviewed and
              processed.
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
            4. Processing Time & Method
          </h2>
          <ul style={{}}>
            <li style={{ color: "#333" }}>
              Refunds, if approved, will be processed within{" "}
              <strong>10 business days</strong> from the date of approval.
            </li>
            <li style={{ color: "#333" }}>
              Refunds will be credited back to the original payment method used
              during the transaction.
            </li>
            <li style={{ color: "#333" }}>
              Any transaction or processing fees incurred during the payment may
              be deducted from the refund amount.
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
            5. Double Payment Cases
          </h2>
          <p>
            If a student accidentally makes multiple payments for the same
            application, they must notify us immediately. Upon verification, the
            excess amount will be refunded within{" "}
            <strong>10 business days</strong>.
          </p>

          <h2
            style={{
              color: "black",
              fontSize: "1.02em",
              marginTop: "20px",
              textAlign: "left", // Left-align the heading
            }}
          >
            6. Course Cancellation or Modifications
          </h2>
          <ul style={{}}>
            <li style={{ color: "#333" }}>
              If a course is discontinued by the university, students will have
              the option to transfer to another course or request a refund.
            </li>
            <li style={{ color: "#333" }}>
              If the university modifies a course structure or content
              significantly, students may request a refund if they do not wish
              to continue.
            </li>
          </ul>
        </section>

        {/* <footer
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ccc",
            paddingTop: "15px",
            fontSize: "1rem", // Reduced for better readability
            // color: "#7f8c8d",
            width: "100%",
            textAlign: "center", // Centers the footer text
          }}
        >
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:support@vidyarishi.com"
              style={{
                color: "#3498db",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              support@vidyarishi.com
            </a>
            .
          </p>
        </footer> */}
      </div>
      <PrivacyFooter title={"Refund Policy"} />
    </>
  );
};

export default RefundPolicyComp;
