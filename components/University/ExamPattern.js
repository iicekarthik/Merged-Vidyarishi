import React from "react";
import { FaFeatherPointed } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

const ExamPattern = ({ university }) => {
  return (
    <div
      id="UniversityExamPattern"
      // style={{ padding: "60px 60px 0 60px", textAlign: "justify" }}
      className="px-5 pt--60"
      style={{
        fontSize: "16px",
        color: "black",
      }}
    >
      {/* <div>
        <h5>
          Exam Pattern Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div> */}

      <div className="d-flex justify-content-start gap-2">
        <h5 className="mb-2">Exam Pattern Of {university?.title}</h5>
      </div>

      <div className="mb--10">
        <h6 className="mt--0 mb--0">
          {/* <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                  }}
                />
              ),
            }}
          >
          </ReactMarkdown> */}
            {university?.examPattern?.examTitle}
        </h6>
        {/* <div className="mt--0"> {university?.ExamPattern?.subTitle}</div> */}
      </div>
      <div className="d-flex flex-column jsutify-content-center">
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
            {university?.examPattern?.about1}
          </ReactMarkdown>
        </div>
        {/* <div> {university?.ExamPattern?.About2}</div>
        <div> {university?.ExamPattern?.About3}</div> */}
      </div>

      <ul
        style={{ paddingLeft: "0px", listStyle: "none", textAlign: "justify" }}
      >
        <h5 style={{ marginBottom: "20px", marginTop: "20px" }}>
          Examination Process
        </h5>
        {university?.examPattern?.onlineExamProcess?.map((data, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "start",
              marginBottom: "8px",
              flexWrap: "wrap",
              fontSize: "16px",
              color: "black",
              textAlign: "justify",
            }}
          >
            <span>
              <FaFeatherPointed size={12} />
            </span>
            <span style={{ flex: "1", wordBreak: "break-word" }}>
              <div style={{ fontWeight: "bold" }}>
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
                  {data?.title}
                </ReactMarkdown>
              </div>
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
                  {data?.desc}
                </ReactMarkdown>
              </div>
            </span>
          </li>
        ))}
      </ul>

      {/* <div
        style={{ paddingLeft: "30px", marginTop: "20px", listStyle: "none" }}
      >
        <h6>Examination Scheme</h6>
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {university?.ExamPattern?.ExamScheme?.ExamParts?.map(
            (data, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                  fontSize: "16px",
                  color: "black",
                }}
              >
                <strong>Part {data?.Name}</strong>
                <span>:-</span>
                <span>{data?.PartContent}</span>
              </li>
            )
          )}
        </ul>
      </div> */}

      {/* <ul style={{ paddingLeft: "30px", marginTop: "20px", listStyle: "none" }}>
        {university?.ExamPattern?.ExamScheme?.DetailsAndInstruction?.map(
          (data, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "8px",
                flexWrap: "wrap",
                fontSize: "16px",
                color: "black",
              }}
            >
              <span>👉</span>
              <span style={{ flex: "1", wordBreak: "break-word" }}>{data}</span>
            </li>
          )
        )}
      </ul> */}
    </div>
  );
};

export default ExamPattern;
