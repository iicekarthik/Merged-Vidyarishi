import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';


const UniSchoolLevelProgramFaq = ({ CourseDetails, BigScreenLogic }) => {
  return (
    <>
      <div
        id="SchoolLevelProgramFaq "
        style={{
          // background: "yellow",
          textAlign: "justify",
          marginBottom: BigScreenLogic ? "" : "120px",
        }}
        className="pt--60"
      >
        <div className="d-flex justify-content-start gap-2">
          <h5 className="mb-2">FAQ's | Frequently Asked Questions</h5>
        </div>

        <div className="rbt-accordion-area accordion-style-1 bg-color-white mt-4 mb-5">
          <div className="container">
            {CourseDetails?.faq?.map((data, index) => (
              <div className="row g-5" key={index}>
                <div className="col-12">
                  <div className="rbt-accordion-style accordion">
                    <div className="rbt-accordion-style rbt-accordion-04 accordion">
                      <div className="accordion" id="accordionExamplec3">
                        {data.faqBody.map((item, innerIndex) => (
                          <div className="accordion-item card" key={innerIndex}>
                            <h2
                              className="accordion-header card-header"
                              id={item.heading}
                            >
                              <button
                                className={`accordion-button ${
                                  !item.collapsed ? "collapsed" : ""
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${item.collapse}`}
                                aria-expanded={item.expanded}
                                aria-controls={item.collapse}
                              >
                                <div className="d-flex align-items-start">
                                  {/* <i className="feather-help-circle mr--10" style={{marginTop : "4px"}} ></i> */}
                                  <span
                                    className="mr--10"
                                    style={{ marginTop: "-3px" }}
                                  >
                                    <FaQuestionCircle />
                                  </span>
                                  <span>
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
                                      {item.accordionTitle}
                                    </ReactMarkdown>
                                  </span>
                                </div>
                              </button>
                            </h2>
                            <div
                              id={item.collapse}
                              className={`accordion-collapse collapse ${
                                item.show ? "show" : ""
                              }`}
                              aria-labelledby={item.heading}
                              data-bs-parent="#accordionExamplec3"
                            >
                              <div className="accordion-body card-body">
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
                                  {item.desc}
                                </ReactMarkdown>
                                <br />
                                <br />
                                <ul
                                  style={{
                                    paddingLeft: "20px",
                                    marginTop: "10px",
                                    listStyle: "none",
                                  }}
                                >
                                  {item?.descList?.map((data, index) => (
                                    <li
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "start",
                                        gap: "10px",
                                        padding: "5px 0",
                                        color: "#333",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "#6200ea",
                                        }}
                                      >
                                        👉
                                      </span>
                                      <span>
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
                                          {data}
                                        </ReactMarkdown>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniSchoolLevelProgramFaq;
