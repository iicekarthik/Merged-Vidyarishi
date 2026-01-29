import { useAppContext } from "@/context/Context";
import { useScreenSize } from "@/hooks/screenSize";
import React from "react";

const PrivacyFooter = ({ title }) => {
  const { setIsOpen } = useAppContext();
  const screenSize = useScreenSize();
  const BigScreenSize = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <div
      className={`rbt-accordion-area accordion-style-1 rbt-section-gap ${
        title !== "Blog" && "pb--60 mb-0"
      }  pt-0`}
    >
      <div
        style={{
          margin:
            title === "Blog"
              ? "0px 40px"
              : BigScreenSize
              ? " 10px 125px 0px 125px"
              : " 10px",
          // fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          color: "black",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: BigScreenSize ? "flex-start" : "normal", // Fix: Start content from left
          textAlign: "justify",
          backgroundColor: "#e9f6ff",
          border: "2px solid #8ecefa",
          padding: "10px 30px",
        }}
      >
        <h2
          style={{
            color: "black",
            fontSize: "1.1em",
            marginTop: "10px",
            textAlign: "center",
            marginBottom: "5px",
          }}
        >
          Support When You Need It {BigScreenSize ? "–" : <br />} Contact Us
          Today!
        </h2>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: 0,
            textAlign: "left",
            // marginTop: "10px",
            marginBottom: 0,
            // maxWidth: "500px",
            // width: "100%",
          }}
        >
          <li style={{ marginBottom: "15px", fontSize: "16px" }}>
            <strong style={{ color: "#555", fontWeight: "600" }}>Email:</strong>{" "}
            <a
              href="mailto:support@vidyarishi.com"
              style={{
                color: "#1a73e8",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              support@vidyarishi.com
            </a>
          </li>
          <li style={{ marginBottom: "15px", fontSize: "16px", color: "#333" }}>
            <strong style={{ color: "#555", fontWeight: "600" }}>Phone:</strong>{" "}
            (+91) 9619 535 535
          </li>
          <li style={{ fontSize: "16px", color: "#333" }}>
            <strong style={{ color: "#555", fontWeight: "600" }}>
              Address:
            </strong>{" "}
            14, Vivina, NADCO Shopping Centre, 2/B, next to bus Depot, opp.
            Railway Station, Railway Colony, Andheri West, Mumbai, Maharashtra
            400058
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyFooter;

{
  /* <div
          // className="pl--40"
          style={{ fontSize: "14px", padding: "0px 40px" }}
          // style={{ flex: "1 1 400px", minWidth: "300px" }}
        >
          <div>
            <h4>
              Have Any{" "}
              <span style={{ color: "#800080", fontWeight: "bold" }}>
                Doubts
              </span>
              <span
                style={{
                  color: "#800080",
                  fontSize: "44px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                ?
              </span>
            </h4>
            <h2>
              <span style={{ color: "#800080", fontWeight: "bold" }}>Talk</span>{" "}
              To <br />
              <span style={{ color: "#800080", fontWeight: "bold" }}>
                Our Experts
              </span>
            </h2>
            <h6>
              chat, call, or video. We’re here to offer counseling in the way
              that works for you.
            </h6>
          </div>

          <div
            className="d-flex justify-content-start justify-content-xl-start justify-content-xxl-start align-items-xl-center  align-items-xxl-center flex-xxl-row flex-xl-row flex-column"
            style={{
              gap: "15px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  backgroundColor: "#b966e7",
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
                onClick={() => setIsOpen(true)}
              >
                <i
                  className="feather-video"
                  style={{ marginRight: "10px" }}
                ></i>
                Schedule Video Call
              </button>
              <button
                onClick={() => setIsOpen(true)}
                style={{
                  backgroundColor: "#b966e7",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  border: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <i
                  className="feather-help-circle"
                  style={{ marginRight: "10px" }}
                ></i>
                Ask Queries
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Link
                target="_blank"
                href={"https://wa.me/919619535535?text=Hello%20Vidyarishi%20"}
                style={{
                  backgroundColor: "#b966e7",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  border: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <i
                  className="feather-message-circle"
                  style={{ marginRight: "10px" }}
                ></i>
                Live Chat Support
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                style={{
                  backgroundColor: "#b966e7",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  border: "none",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <i
                  className="feather-phone-call  "
                  style={{ marginRight: "10px" }}
                ></i>
                Request Call Back
              </button>
            </div>
          </div>

          <div className="mt--30" style={{ textWrap: "wrap" }}>
            <p>
              If you have any questions about these {title},
              {BigScreenSize && <br />}
              please contact us at{" "}
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
          </div>
        </div> */
}

{
  /* <div
          className="col-lg-2 col-md-2 col-2 d-sm-none d-none d-lg-none d-xxl-block d-xl-block"
          style={{
            flex: "1 1 1",
            minWidth: "450px",
            textAlign: "center",
          }}
        >

          <video
            // src={"../../public/vidya/video/contact.mp4"}
            src={"/video/contact.mp4"}
            style={{ width: "100%", height: "auto" }}
            // controls
            autoPlay
            muted
            loop
          />
        </div> */
}
