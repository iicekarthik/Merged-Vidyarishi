import { FaQuestionCircle } from "react-icons/fa";
import AccordionData from "../../data/elements/accordion.json";
import TeamHead from "../Team/TeamHead";

const PartnerFAQ = () => {
  return (
    <div>
      {AccordionData?.PartnerFAQ.map((data, index) => (
        <div
          className="row g-5 align-items-center d-xxl-block d-xl-block d-md-block d-flex "
          style={{ justifyContent: "center" }}
          key={index}
        >
          <div className="col-xl-10 col-xxl-10 col-10 offset-lg-1 ">
            <div className="rbt-accordion-style accordion pt--30">
              <TeamHead
                isTheme={"theme2"}
                subTitle={data.tag}
                title={data.title}
                Jointtitle={data.subTitle}
                desc={data?.description}
                isPurpuleHeading2={true}
              />
              {/* <div className="section-title text-center mb--60">

                <span className="subtitle bg-pink-opacity">{data.tag}</span>
                <h2 className="title">
                  {data.title} <br /> {data.subTitle}
                </h2>
                <p className="description has-medium-font-size mt--20">
                  <strong>{data.strong}</strong> {data.description}
                </p>
              </div> */}

              <div className="rbt-accordion-style rbt-accordion-04 accordion">
                <div className="accordion" id="accordionExamplec3">
                  {data.faqBody.map((item, innerIndex) => (
                    <div className="accordion-item card" key={innerIndex}>
                      <h2
                        className="accordion-header card-header fs-1 gap-2 d-flex"
                        id={item.heading}
                      >
                        {/* <i
                          className="feather-star mt-xxl-1 mt-xl-1 mt-2"
                          style={{
                            color: "#800080",
                          }}
                        ></i> */}
                        <span className="mr--10" style={{ marginTop: "-3px" }}>
                          <FaQuestionCircle size={18} />
                        </span>
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
                          {item.accordionTitle}
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
                          {item.desc}
                          {item.phone ? (
                            <>
                              <br />
                              <span>Phone :- {item.phone}</span>
                            </>
                          ) : (
                            ""
                          )}
                          {item.email ? (
                            <>
                              <br />
                              <span>Email :- {item.email}</span>
                            </>
                          ) : (
                            ""
                          )}
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
  );
};

export default PartnerFAQ;
