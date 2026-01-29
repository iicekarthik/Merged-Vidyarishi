import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarOfLife } from "react-icons/fa";
import CertificatePopup from "./CertificatePopup";
import DynamicImage from "./DynamicImage";
import { useAppContext } from "@/context/Context";
import ReactMarkdown from "react-markdown";

const SampleCertificate = ({ university, screenSize }) => {
  const Certificate = university?.sampleCertificate?.certificate;
  const desc = university?.sampleCertificate?.desc;
  const KeyPoints = university?.sampleCertificate?.points;

  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  const [OpenCertificate, setOpenCertificate] = useState(false);

  useEffect(() => {
    if (OpenCertificate) {
      document.documentElement.style.overflow = "hidden"; // Enable scrolling when popup closes
    } else {
      document.documentElement.style.overflowY = "auto"; // Disable scrolling
    }
  }, [OpenCertificate]);

  const { setIsOpen } = useAppContext();

  return (
    <>
      <div
        id="UniversitySampleCertificate"
        // style={{ padding: "60px 60px 0px 60px" }}
        className="px-5 pt--60"
      >
        {/* <h5>
        Sample Certificate Of{" "}
        <span style={{ color: "purple" }}>{university?.title}</span>
      </h5> */}

        <div className="d-flex justify-content-start gap-2">
          <h5 className="mb-2">Sample Certificate Of {university?.title}</h5>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            // flexDirection: "row",
            marginTop: "20px",
            fontSize: "16px",
            color: "black",
            gap: "40px",
            textAlign: "justify",
          }}
          className="flex-xxl-row flex-xl-row flex-column-reverse"
        >
          <div style={{ width: BigScreenLogic ? "60%" : "100%" }}>
            <span>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    />
                  ),
                }}
              >
                {desc}
              </ReactMarkdown>
            </span>
            <ul style={{ paddingLeft: "20px", marginTop: "20px" }}>
              {KeyPoints?.map((data, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "5px",
                    color: "black",
                    textAlign: "justify",
                  }}
                >
                  <span className="mr--10" style={{ marginTop: "-2px" }}>
                    <FaStarOfLife size={10} />
                  </span>
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          
                        />
                      ),
                    }}
                  >
                    {data}
                  </ReactMarkdown>
                </li>
              ))}
            </ul>
            <div className="ml--30 mt--0">
              <button onClick={() => setIsOpen(true)} className="rbt-btn8">
                Get Your Certificate
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: BigScreenLogic ? "60px" : "0",
              width: BigScreenLogic ? "40%" : "100%",
            }}
          >
            {Certificate ? (
              <div
              // style={{ position: "relative", width: "100%", height: "100%" }}
              >
                {/* <Image
                  src={Certificate} // Image source
                  alt="Certificate"
                  width={240} // Fixed width
                  height={320} // Fixed height
                  style={{
                    objectFit: "cover", // Image will fill container & crop excess part
                    borderRadius: "2px",
                    cursor: "pointer",
                    boxShadow: "10px 16px 12px gray",
                  }}
                  onClick={() => setOpenCertificate(true)}
                  priority
                  unoptimized
                /> */}
                <DynamicImage
                  onclick={() => setOpenCertificate(true)}
                  src={Certificate}
                  alt={university?.title}
                  width={university?.sampleCertificate?.width}
                  height={university?.sampleCertificate?.height}
                  isShadow={true}
                />
              </div>
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>Not Available</p>
            )}
          </div>
        </div>
      </div>

      {OpenCertificate && (
        <CertificatePopup
          CertificateImage={Certificate}
          onClose={() => setOpenCertificate(false)}
        />
      )}
    </>
  );
};

export default SampleCertificate;
