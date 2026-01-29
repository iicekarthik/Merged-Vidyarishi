import React from "react";
import ReactMarkdown from "react-markdown";

const CourseSyllabus = ({ CourseDetails, BigScreenLogic }) => {
  return (
    <>
      <div
        id="CourseSyallabus"
        style={{
          
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2 mb-4">
          <h5 className="mb-2">
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course
            Syllabus
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column mb-5  ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
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
                {CourseDetails?.syllabus?.contentOne?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.syllabus?.contentOne?.desc?.map((items, index) => (
              <div
                key={index}
                style={{
                  fontSize: "16px",
                  color: "black",
                  padding: "0",
                  margin: "0 0 0px 0",
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
                  {items}
                </ReactMarkdown>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center flex-column ">
            <div
              className="d-flex justify-content-between flex-wrap"
              style={{
                gap: "20px",
              }}
            >
              {CourseDetails?.syllabus?.semester?.map((semester, index) => (
                <table
                  key={index}
                  style={{
                    width: BigScreenLogic ? "45%" : "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    border: "2px solid black",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <thead
                    style={{
                      fontSize: "16px",
                      color: "black",
                    }}
                  >
                    <tr style={{ backgroundColor: semester.bgColor }}>
                      <th
                        colSpan="2"
                        style={{
                          padding: "12px",
                          fontSize: "18px",
                          textAlign: "center",
                          borderBottom: "2px solid black",
                        }}
                      >
                        {semester.semester}
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      fontSize: "16px",
                      color: "black",
                    }}
                  >
                    {semester.subjects.map((subject, subIndex) => (
                      <tr key={subIndex}>
                        <td
                          style={{
                            padding: "10px",
                            borderBottom: "1px solid black",
                            backgroundColor:
                              subIndex % 2 === 0 ? "#fff" : "#f9f9f9",
                          }}
                        >
                          {subIndex + 1}.
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            borderBottom: "1px solid black",
                            backgroundColor:
                              subIndex % 2 === 0 ? "#fff" : "#f9f9f9",
                          }}
                        >
                          <ReactMarkdown
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
                            {subject}
                          </ReactMarkdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column my-5 ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
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
                {CourseDetails?.syllabus?.specializationProjects?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.syllabus?.specializationProjects?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 15px 0",
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
                    {items}
                  </ReactMarkdown>
                </div>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
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
                {CourseDetails?.syllabus?.howExamsConduct?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.syllabus?.howExamsConduct?.desc?.map(
              (items, index) => (
                <div
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0 0 10px 0",
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
                    {items}
                  </ReactMarkdown>
                </div>
              )
            )}
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {CourseDetails?.syllabus?.howExamsConduct?.keyPoints?.map(
                (feature, index) => (
                  <li
                    style={{
                      fontSize: "16px",
                      color: "black",
                    }}
                    key={index}
                  >
                    <strong>
                      <ReactMarkdown
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
                        {feature.title + " : "}
                      </ReactMarkdown>
                    </strong>
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
                      {feature.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseSyllabus;
