import React from "react";
import ReactMarkdown from "react-markdown";

const AboutUniversity = ({ university }) => {
  return (
    <div
      id="UniversityAbout"
      style={{
        // background: "yellow",
        textAlign: "justify",
      }}
      className="px-5 pt--60"
    >
      <div className="d-flex justify-content-start gap-2 mb-4">
        <h5 className="mb-2">About {university?.title}</h5>
      </div>

      <div className="d-flex justify-content-center flex-column ">
        <p
          style={{
            fontSize: "16px",
            color: "black",
          }}
          className="text-justify mb-4"
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
            {university?.about1}
          </ReactMarkdown>
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "black",
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
            {university?.about2}
          </ReactMarkdown>
        </p>
      </div>

      <div className="d-flex justify-content-start gap-2 mb-4 mt--20">
        <h5 className="mb-2">Key Highlights</h5>
      </div>

      <div className="d-flex justify-content-left align-items-left ">
        <table
          border="2"
          style={{
            // width: "80%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  fontSize: "16px",
                  color: "black",
                  padding: "8px",
                  color: "black",
                  backgroundColor: "#ebebeb",
                  border: "2px solid black",
                }}
              >
                Feature
              </th>
              <th
                style={{
                  fontSize: "16px",
                  color: "black",
                  padding: "8px",
                  color: "black",
                  backgroundColor: "#ebebeb",
                  border: "2px solid black",
                }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {university?.keyHighlights?.map((tableData, index) => (
              <tr key={index}>
                <td
                  style={{
                    fontSize: "14px",
                    color: "black",
                    padding: "8px",
                    border: "2px solid black",
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
                    {tableData?.feature}
                  </ReactMarkdown>
                </td>
                <td
                  style={{
                    fontSize: "14px",
                    color: "black",
                    padding: "8px",
                    border: "2px solid black",
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
                    {tableData?.details}
                  </ReactMarkdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutUniversity;
