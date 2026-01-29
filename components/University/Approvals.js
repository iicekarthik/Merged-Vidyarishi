import Image from "next/image";
import React from "react";
import DynamicImage from "./DynamicImage";
import ReactMarkdown from "react-markdown";

const Approvals = ({ university }) => {
  return (
    <div
      id="UniversityApprovals"
      // style={{ padding: "60px 60px 0px 60px" }}
      className="px-5 pt--60"
    >
      {/* <div>
        <h5>
          Approvals Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div> */}
      <div className="d-flex justify-content-start gap-2 mb-4">
        <h5 className="mb-2">Approvals {university?.title}</h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            gap: "20px",
            // padding: "20px",
            width: "100%",
          }}
          className="d-flex flex-column flex-xxl-row flex-xl-row"
        >
          {university?.accredation?.map((data, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 calc(15% - 20px)",
                // maxWidth: "calc(25% - 20px)",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "20px",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <DynamicImage
                key={index}
                src={data?.accredationImage}
                alt={data?.shortName}
                width={70}
                height={70}
                isShadow={false}
              />
              <h2
                style={{
                  fontSize: "1.5rem",
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  textAlign: "center",
                }}
              >
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
                  {data?.shortName}
                </ReactMarkdown>
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approvals;
