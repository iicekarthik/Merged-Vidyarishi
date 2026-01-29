import React from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";

const UniCourseEligibilityDuration = ({ CourseDetails }) => {
  return (
    <>
      <div
        id="CourseEligibilityDuration"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5
            style={{
              padding: "0",
              margin: "0 0 15px 0",
            }}
          >
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course
            Eligibility Criteria And Duration
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column">
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
                {CourseDetails?.eligibilityDuration?.desc}
              </ReactMarkdown>
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column mt-4">
            <h5
              style={{
                fontSize: "18px",
                color: "black",
                padding: "0",
                margin: "10px 0 6px 0",
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
                {
                  CourseDetails?.eligibilityDuration?.eligibilityDetails
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <div className="pl--20">
              <ul style={{ padding: "0", margin: "0 0 15px 0" }}>
                {CourseDetails?.eligibilityDuration?.eligibilityDetails?.points?.map(
                  (items, index) => (
                    <li
                      style={{
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      <b>
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
                          {items?.title + " :-"}
                        </ReactMarkdown>
                      </b>
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
                        {items?.desc}
                      </ReactMarkdown>
                    </li>
                  )
                )}
              </ul>
              <p
                style={{
                  fontSize: "18px",
                  color: "black",
                  padding: "0",
                  margin: "0px 40px 15px 0",
                }}
              >
                <b>
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
                    {CourseDetails?.eligibilityDuration?.eligibilityDetails
                      ?.note?.title + " :- "} 
                  </ReactMarkdown>
                </b>{" "}
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
                  {
                    CourseDetails?.eligibilityDuration?.eligibilityDetails?.note
                      ?.desc
                  }
                </ReactMarkdown>
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column ">
            <h5
              style={{
                fontSize: "18px",
                color: "black",
                padding: "0",
                margin: "18px 0 10px 0",
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
                {CourseDetails?.eligibilityDuration?.durationDetails?.heading}
              </ReactMarkdown>
            </h5>
            <div className="pl--20">
              <ul style={{ padding: "0", margin: "0 0 15px 0" }}>
                {CourseDetails?.eligibilityDuration?.durationDetails?.points?.map(
                  (items, index) => (
                    <li
                      style={{
                        fontSize: "16px",
                        color: "black",
                      }}
                    >
                      <b>
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
                          {items?.title + " :- "}
                        </ReactMarkdown>
                      </b>
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
                        {items?.desc}
                      </ReactMarkdown>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-center flex-column my-4">
            <h5
              style={{
                fontSize: "18px",
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
                {CourseDetails?.eligibilityDuration?.advantages?.heading}
              </ReactMarkdown>
            </h5>
            <p
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
                {CourseDetails?.eligibilityDuration?.advantages?.desc}
              </ReactMarkdown>
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column mb--40 mt-5">
            <DynamicCourseTable
              headers={["feature", "details"]}
              data={
                CourseDetails?.eligibilityDuration?.advantages?.advantagesDetail
              }
              headerBgColor="#374151"
              headerTextColor="white"
              hoverColor="#D1D5DB"
              borderColor="#9CA3AF"
              borderRadius="8px" // 🔹 Custom border-radius
              boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)" // 🔹 Custom shadow
            />
          </div>

          <div className="d-flex justify-content-center flex-column mt-4">
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
                {
                  CourseDetails?.eligibilityDuration?.advantages?.whyCourse
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <p
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
                {
                  CourseDetails?.eligibilityDuration?.advantages?.whyCourse
                    ?.desc
                }
              </ReactMarkdown>
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                color: "black",
              }}
            >
              {CourseDetails?.eligibilityDuration?.advantages?.whyCourse?.whyCourseDetails?.map(
                (item, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      fontSize: "16px",
                      padding: "0",
                      margin: "0 0 15px 0",
                    }}
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
                        {item.title + " : "}
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
                      {item.desc}
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

export default UniCourseEligibilityDuration;
