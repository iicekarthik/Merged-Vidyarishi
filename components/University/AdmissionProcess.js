import React, { useEffect, useState } from "react";
import HowWeWork from "../Work";
import ReactMarkdown from "react-markdown";

const AdmissionProcess = ({ university }) => {
  const [CurrentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const CurrentYear = new Date().getFullYear();
    setCurrentYear(CurrentYear);
  }, []);

  return (
    <div
      id="UniversityAdmissionProcess"
      // style={{ padding: "60px 60px 0 60px" }}
      className="px-5 pt--60"
    >
      {/* <div>
        <h5>
          Admission Process Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div> */}

      <div className="d-flex justify-content-start gap-2">
        <h5 className="mb-2">Admission Process Of {university?.title}</h5>
      </div>

      <div
        className="d-flex flex-column justify-content-center align-items-start mt--10"
        style={{ textAlign: "justify", fontSize: "16px", color: "black" }}
      >
        <div>
          {university?.admissionProcess?.map((AdmissionProces) => (
            <div>
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
                {AdmissionProces}
              </ReactMarkdown>
            </div>
          ))}
        </div>

        <div className="mt--10" style={{ fontWeight: "bold" }}>
          The admission procedure for {CurrentYear} for the online courses at{" "}
          {university?.title} is as follows:
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-column">
        {/* {university?.AdmissionProcess?.map((data, index) => (
          <div className="d-flex flex-row gap-4 justify-content-start align-items-start ">
            <div>
              <span>Step {index + 1}</span>
              &nbsp; &nbsp;
              <span>-</span>
            </div>
            <div>{data}</div>
          </div>
        ))} */}
        <div className="mt--40">
          <div className="container">
            <HowWeWork />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcess;
