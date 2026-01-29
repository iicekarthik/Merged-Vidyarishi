import React from "react";

const EligibilityCriteria = ({ university }) => {
  return (
    <div id="UniversityEligibilityCriteria" style={{ padding: "60px" }}>
      <div>
        <h5>
          Eligibility Criteria Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-lg-10 ml--20 mt--30">
          <div className="rbt-feature-wrapper">
            <div className="rbt-feature feature-style-2">
              {/* <div className="icon bg-pink-opacity">
                <i className="feather-heart"></i>
              </div> */}
              <div className="feature-content">
                <h6 className="feature-title mb--30">For Indian Student</h6>
                <ul className="plan-offer-list">
                  {university?.EligibilityCriteria?.ForIndianStudent?.map(
                    (criteria, index) => (
                      <>
                        <li key={index}>
                          <div className="d-flex justify-content-start align-items-start gap-1">
                            <div>
                              <i
                                className="feather-check"
                                style={{ marginTop: "8px" }}
                              ></i>
                              {/* {index + 1} */}
                            </div>
                            <div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: criteria?.Indian,
                                }}
                                className="feature-description"
                              ></p>
                            </div>
                          </div>
                        </li>
                      </>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className="rbt-feature feature-style-2">
              <div className="feature-content">
                <h6 className="feature-title mb--30">For Foreign Student</h6>
                <ul className="plan-offer-list">
                  {university?.EligibilityCriteria?.ForForeignStudent?.map(
                    (criteria, index) => (
                      <>
                        <li key={index}>
                          <div className="d-flex justify-content-start align-items-start gap-1">
                            <div>
                              <i
                                className="feather-check"
                                style={{ marginTop: "8px" }}
                              ></i>
                              {/* {index + 1} */}
                            </div>
                            <div>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: criteria?.Foreign,
                                }}
                                className="feature-description"
                              ></p>
                            </div>
                          </div>
                        </li>
                      </>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "nowrap",
          // overflowX: "auto",
          padding: "10px",
          textAlign: "center",
        }}
      >
        {university?.Accredation?.map((data, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto", // 🚀 Prevent shrinking, fixed size cards
              width: "18%", // ✅ Each card takes 18% width
              maxWidth: "200px", // 🔥 Responsive limit
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <Image width={80} height={80} src={data?.AccredationImage} />
            <div>
              <h2
                style={{
                  fontSize: "1.7rem",
                  margin: "20px 0px 0px 0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  textAlign: "center",
                }}
              >
                {data?.shortName}
              </h2>
            </div>
          </div>
        ))}
      </div> */}
        <a href="http://aiu.ac.in/)">http://aiu.ac.in/</a>
      </div>
    </div>
  );
};

export default EligibilityCriteria;
