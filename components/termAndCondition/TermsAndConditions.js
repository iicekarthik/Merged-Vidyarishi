import { useEffect, useState } from "react";
import PrivacyFooter from "./PrivacyFooter";
import { useScreenSize } from "@/hooks/screenSize";

const TermsAndConditions = () => {
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
          padding: BigScreenSize ? "20px 145px 0px 145px" : "20px",
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
            fontSize: "1.7em",
            color: "#2c3e50",
            marginBottom: "10px",
            textAlign: "left", // Align heading to the left
          }}
        >
          Terms and Conditions
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "10px",
            textAlign: "justify", // Ensure paragraph is justified
          }}
        >
          Last Updated :- 01-April-2025
        </p>

        <section
          style={{
            marginTop: "20px",
            textAlign: "justify", // Ensure content inside the section is justified
            padding: "30px 0 20px 0",
          }}
        >
          <div
            style={
              {
                // maxWidth: "900px",
                // margin: "0 auto",
                // padding: "20px",
                // borderRadius: "8px",
              }
            }
          >
            <p>
              Welcome to Vidyarishi.com ("we", "our", "us"). By accessing and
              using our website, you agree to abide by these Terms and
              Conditions. Please read these Terms carefully before using our
              services. If you do not agree with these terms, do not access or
              use this website.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              1. Acceptance of Terms
            </h2>
            <p>
              By using Vidyarishi.com, you agree to be bound by these Terms and
              Conditions and our Privacy Policy. We reserve the right to modify,
              update, or change these Terms at any time, and such changes will
              be effective immediately upon posting. You are responsible for
              reviewing these Terms regularly.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              2. Services Provided
            </h2>
            <p>
              Vidyarishi.com is an online educational platform that collaborates
              with universities and institutions to provide distance learning
              programs, including undergraduate, postgraduate, diploma, and
              certificate courses. We offer the following services:
            </p>
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: 0,
                marginTop: "10px",
              }}
            >
              <li>Registration for online courses and programs</li>
              <li>
                Assistance with the admission process to partner universities
              </li>
              <li>
                Access to resources for students enrolled in partner programs
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
              3. Eligibility
            </h2>
            <p>
              You must be at least 18 years of age to use our services and
              register for courses through Vidyarishi.com. By using this
              website, you represent and warrant that you meet this age
              requirement.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              4. User Accounts
            </h2>
            <p>
              To access certain features on Vidyarishi.com, such as course
              registration or communication with our support team, you must
              create an account. You are responsible for providing accurate
              information and maintaining the confidentiality of your account
              credentials. You agree to notify us immediately of any
              unauthorized use of your account.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              5. Course Enrollment and Payment
            </h2>
            <p>
              Vidyarishi.com provides information on various educational
              programs and helps you with the enrollment process. Payments for
              courses are processed through secure payment gateways. By
              enrolling, you agree to pay the fees associated with the program,
              as well as any other charges that may apply. All fees are
              non-refundable once the enrollment process has been initiated.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              6. Content and Materials
            </h2>
            <p>
              All content, including but not limited to text, images, videos,
              and documents, provided through Vidyarishi.com is owned by
              Vidyarishi or its partners and is protected by copyright laws. You
              may not reproduce, distribute, or otherwise use this content
              without explicit written consent from Vidyarishi or its licensors.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              7. Third-Party Websites and Links
            </h2>
            <p>
              Vidyarishi.com may contain links to third-party websites or
              resources. These links are provided for your convenience, and we
              are not responsible for the availability, content, or practices of
              these external sites. Accessing third-party websites is at your
              own risk.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              8. Privacy and Data Protection
            </h2>
            <p>
              Your use of Vidyarishi.com is governed by our{" "}
              <a href="/privacy-policy" style={{ color: "#1a73e8" }}>
                Privacy Policy
              </a>
              , which details how we collect, use, and protect your personal
              information. By using the site, you consent to our collection and
              use of your personal data in accordance with our Privacy Policy.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              9. Limitation of Liability
            </h2>
            <p>
              Vidyarishi.com is provided "as is" without any guarantees or
              warranties, either express or implied. We do not guarantee that
              the website or its services will be uninterrupted, error-free, or
              free from viruses. To the fullest extent permitted by law,
              Vidyarishi will not be liable for any damages arising out of or
              related to your use of the website or enrollment in courses.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Vidyarishi.com, its
              affiliates, employees, and agents from any claims, losses, or
              damages arising out of your use of the website, your violation of
              these Terms, or your enrollment in educational programs.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              11. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms and Conditions are governed by the laws of [Insert
              Jurisdiction]. Any disputes that arise from your use of
              Vidyarishi.com will be subject to the exclusive jurisdiction of
              the courts in [Insert Location]. You agree to resolve disputes
              through arbitration, where applicable.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              12. Termination of Access
            </h2>
            <p>
              Vidyarishi.com reserves the right to suspend or terminate your
              access to the website and services at our discretion, particularly
              in the case of any violation of these Terms. Upon termination, you
              must cease using the website and destroy all materials obtained
              from it.
            </p>

            <h2
              style={{
                color: "black",
                fontSize: "1.02em",
                marginTop: "20px",
                textAlign: "left", // Left-align the heading
              }}
            >
              13. Changes to the Terms and Conditions
            </h2>
            <p>
              Vidyarishi.com reserves the right to modify, update, or revise
              these Terms and Conditions at any time. We will notify you of any
              significant changes, but it is your responsibility to review these
              Terms regularly for any updates.
            </p>
          </div>
        </section>
      </div>

      <PrivacyFooter title={"Terms and Conditions"} />
    </>
  );
};

export default TermsAndConditions;
