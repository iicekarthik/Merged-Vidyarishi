import Link from "next/link";

import CallToActionData from "../../data/elements/calltoaction.json";
import { useAppContext } from "@/context/Context";

const CallToActionSix = () => {
  const { isOpen, setIsOpen } = useAppContext();

  return (
    <div className="container">
      {CallToActionData &&
        CallToActionData.collectionSix.map((data, index) => (
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
            className=""
            key={index}
          >
            <div className="">
              <div className="col-xxl-12 col-xl-12 col-lg-8">
                <div className="inner">
                  <div className="content text-start">
                    <h2 className="title color-white mb--0">{data.title}</h2>
                  </div>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-12 mt--10">
                <div className="inner-content text-start">
                  <p className="color-white">{data.desc}</p>
                </div>
              </div>
            </div>

            <div className="col-xxl-12 col-xl-12 col-lg-12 mt--60">
              <div className="call-to-btn text-start text-xl-end">
                <button
                  className="rbt-btn btn-white hover-icon-reverse"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Enquire Now</span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-arrow-right"></i>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CallToActionSix;
