import React, { useEffect } from "react";
import DynamicCourseTable from "../../Courses/DynamicCourseTable";
import ReactMarkdown from "react-markdown";
import { useFetchUniversitiesSorted } from "@/hooks/useFetchUniversitiesByCourse";

const UniCourseTopUniversitites = ({ CourseDetails }) => {


  const { universities, UniveristyLoading, fetchUniversitiesSorted } =
    useFetchUniversitiesSorted();

  useEffect(() => {
    fetchUniversitiesSorted(
      CourseDetails?.shortName,
      CourseDetails?.degree_type
    );
  }, [fetchUniversitiesSorted]);

  return (
    <>
      <div
        id="CourseTopUniversities"
        style={{
          // background: "yellow",
          textAlign: "justify",
        }}
        className="pt--55"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5 className="">
            {" "}
            {CourseDetails?.course_type} {CourseDetails?.shortName} Course Top
            Universitites
          </h5>
        </div>

        <div style={{ padding: "0px 20px", color: "black" }}>
          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 15px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.topUniversities?.pointOne?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.topUniversities?.pointOne?.desc?.map(
              (items, index) => (
                <p
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
                </p>
              )
            )}
          </div>

          {
            universities.length > 0 ? (
              <div className="d-flex justify-content-center flex-column mt-4 mb-5 ">
                <DynamicCourseTable
                  headers={[
                    "universityName",
                    "semesterFees / Annual Fees",
                    "location",
                    "approvalsAccredation",
                    "downloadBrochure",
                  ]}
                  data={universities}
                  headerBgColor="#374151"
                  headerTextColor="white"
                  hoverColor="#D1D5DB"
                  borderColor="#9CA3AF"
                  borderRadius="8px"
                  boxShadow="0px 20px 12px rgba(0, 0, 0, 0.2)"
                />
              </div>

            ) : (
              <div
                style={{
                  padding: "30px 40px", border: "1px solid black", margin: "20px 7px", fontWeight: "bold", borderRadius: "40px", textAlign: "center"
                }}
              >
                Top Universities Coming Soon ....
              </div>

            )

          }

          <div className="d-flex justify-content-center flex-column "></div>

          <p
            style={{
              margin: "0",
              padding: "0",
              fontSize: "16px",
              color: "black",
            }}
          >
            <b>{CourseDetails?.topUniversities?.note?.title} : </b>{" "}
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
              {CourseDetails?.topUniversities?.note?.desc}
            </ReactMarkdown>
          </p>

          <div className="d-flex justify-content-center flex-column mt-5 mb-3">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.topUniversities?.pointThree?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.topUniversities?.pointThree?.desc?.map(
              (items, index) => (
                <p
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
                </p>
              )
            )}
          </div>

          <div className="d-flex justify-content-center flex-column mb-4 ">
            <h5 style={{ padding: "0", margin: "10px 0 15px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.topUniversities?.pointThree?.subPointsOne
                    ?.heading
                }
              </ReactMarkdown>
            </h5>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                paddingBottom: "0",
                marginBottom: "0",
              }}
            >
              {CourseDetails?.topUniversities?.pointThree?.subPointsOne?.keyPoints?.map(
                (exam, index) => (
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
                        {exam.title + " : "}
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
                      {exam.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>
            <p
              style={{
                fontSize: "16px",
                color: "black",
                padding: "0",
                margin: "0px 0 15px 0",
              }}
            >
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {
                  CourseDetails?.topUniversities?.pointThree?.subPointsOne
                    ?.subHeading
                }
              </ReactMarkdown>
            </p>
          </div>

          <div className="d-flex justify-content-center flex-column  ">
            <h5 style={{ padding: "0", margin: "0 0 10px 0" }}>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {CourseDetails?.topUniversities?.pointFour?.heading}
              </ReactMarkdown>
            </h5>
            {CourseDetails?.topUniversities?.pointFour?.desc?.map(
              (items, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: "16px",
                    color: "black",
                    padding: "0",
                    margin: "0px 0 15px 0",
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
                </p>
              )
            )}
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {CourseDetails?.topUniversities?.pointFour?.keyPoints?.map(
                (tip, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      color: "black",
                      fontSize: "16px",
                      padding: "0",
                      margin: "0 0 10px 0",
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
                        {tip.title + " : "}
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
                      {tip.desc}
                    </ReactMarkdown>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div >
    </>
  );
};

export default UniCourseTopUniversitites;
