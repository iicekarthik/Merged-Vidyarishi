import React from "react";
import Step1 from "../../public/images/vidya/weWork/01.jpg";
import Step2 from "../../public/images/vidya/weWork/02.jpg";
import Step3 from "../../public/images/vidya/weWork/03.jpg";
import Step4 from "../../public/images/vidya/weWork/04.jpg";
import Step5 from "../../public/images/vidya/weWork/05.jpg";
import Image from "next/image";

const steps = [Step1, Step2, Step3, Step4, Step5];
const captions = [
  {
    title: "Registration",
    desc: "Register with your education and work details and pay the registration fee",
  },
  {
    title: "Document Upload",
    desc: "Upload supporting documents on the admission portal",
  },
  {
    title: "University Verification",
    desc: "The university will verify your documents & eligibilitydasd",
  },
  {
    title: "Admission Fee Payment",
    desc: "After successful verification, pay Your admission fee or avail of no-cost EMI",
  },
  {
    title: "Student Registration",
    desc: "Begin your learning journey with access to LMS",
  },
];

const HowWeWork = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "0 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="flex-column flex-xxl-row flex-xl-row"
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #800080",
                    borderRadius: "50%",
                    width: "140px",
                    height: "140px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "119px",
                      height: "118px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "105px",
                        height: "105px",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <Image
                        alt={`Step ${index + 1}`}
                        style={{
                          objectFit: "contain",
                        }}
                        width={60}
                        height={60}
                        src={step}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <>
                  <div
                    className="d-xxl-flex d-xl-flex d-l-flex d-none"
                    style={{
                      width: "14%",
                      maxWidth: "200px",
                      height: "1px",
                      borderTop: "2px dashed #800080",
                    }}
                  ></div>
                </>
              )}

              {index < steps.length && (
                <>
                  <div
                    className="d-flex d-xxl-none  d-xl-none"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px",
                    }}
                  >
                    <div className="w-100 text-center">
                      <h6
                        style={{
                          margin: "5px 0 0 0",
                          padding: "0",
                          fontSize: "18px",
                          color: "#800080",
                          fontWeight: "bolder",
                        }}
                      >
                        {"Step : " + [index + 1]}
                        <br />
                        {captions[index]?.title}
                      </h6>
                      <div
                        style={{
                          fontSize: "16px",
                          margin: "10px 0 0 0",
                          padding: "0",
                        }}
                      >
                        {captions[index]?.desc}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ------------------------------------------------- */}
        <div
          className="d-xxl-flex d-xl-flex d-none"
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          {captions.map((step, index) => (
            <React.Fragment key={index}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // border: "2px dashed gray",
                    borderRadius: "50%",
                    width: "150px",
                    // height: "130px",
                  }}
                >
                  {/* <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      margin: "5px",
                      width: "119px",
                      height: "118px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <Image
                        alt={`Step ${index + 1}`}
                        width={50}
                        height={50}
                        src={step}
                      />
                    </div>
                  </div> */}

                  <div
                    className="d-flex"
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <h6
                      style={{
                        margin: "5px 0 0 0",
                        padding: "0",
                        fontSize: "18px",
                        color: "#800080",
                        fontWeight: "bolder",
                      }}
                    >
                      {step?.title}
                    </h6>
                    <div
                      style={{
                        fontSize: "16px",
                        margin: "10px 0 0 0",
                        padding: "0",
                      }}
                    >
                      {step?.desc}
                    </div>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    // position: "relative",
                    // top: "-35px",
                    width: "100px",
                    height: "1px",
                    // borderTop: "2px dashed gray",
                    // marginTop : "-30px"
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default HowWeWork;
