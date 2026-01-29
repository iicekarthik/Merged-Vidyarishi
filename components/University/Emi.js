import React from "react";
import ReactMarkdown from "react-markdown";

const Emi = ({ university }) => {
  return (
    <div
      id="UniversityEmi"
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
        <h5 className="mb-2">
          <span>Emi Facilities Available </span>
          {university?.title}
        </h5>
      </div>

      <div>
        <div style={{ color: "black", textAlign: "justify", fontSize: "16px" }}>
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
            {university?.emiAvailable?.desc}
          </ReactMarkdown>
        </div>
        <ul
          style={{
            margin: "-10px 0 20px 0px",
            padding: "0",
          }}
        >
          {university?.emiAvailable?.descList?.map((data, index) => (
            <li style={{ color: "black", fontSize: "16px" }}>
              <span style={{ fontWeight: "bold" }}>
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
              </span>
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
                  {data?.content}
                </ReactMarkdown>
              </span>
            </li>
          ))}
        </ul>
        <div
          style={{
            color: "black",
            textAlign: "justify",
            fontSize: "16px",
            margin: "-10px 0 20px 0px",
            padding: "0",
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
            {university?.emiAvailable?.desc2}
          </ReactMarkdown>
        </div>
      </div>

      <ul
        style={{
          textAlign: "justify",
          // padding : "0", margin : "0"
        }}
      >
        {university?.emiAvailable?.keyPoints?.map((data, index) => (
          <li style={{ color: "black", fontSize: "16px" }}>
            <span style={{ fontWeight: "bold" }}>{data?.feature} :</span> <br />
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
                {data?.point}
              </ReactMarkdown>
            </span>
          </li>
        ))}
      </ul>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "nowrap",
            // overflowX: "auto",
            // padding: "10px",
            // textAlign: "center",
            marginTop: "10px",
          }}
        >
          <br />
          We Will Update Content
        </div>
      </div> */}
    </div>
  );
};

export default Emi;
