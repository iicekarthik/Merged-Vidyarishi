import Image from "next/image";
import Link from "next/link";
import React from "react";
import DynamicImage from "./DynamicImage";
import { useAppContext } from "@/context/Context";
import ReactMarkdown from "react-markdown";

const UniversityTop = ({ university, screenSize }) => {
  const marginTopDynamic = ["xxl", "xl", "lg"].includes(screenSize)
    ? "0px"
    : "45px";

  const ScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  const { setIsOpen } = useAppContext();

  return (
    <div
      className={` ${
        ScreenLogic ? "pt--55 pb--55" : "pt--20 pb--30"
      } pb-xxl-5 pb-xl-5 px-5 col-12 d-flex justify-content-center 
    flex-xxl-row flex-xl-row
    flex-column align-items-center `}
      style={{
        gap: "45px",
      }}
    >
      <div>
        <Image
          // className="rounded-pill"
          style={{
            borderRadius: "50px",
            objectFit: "fill",
            boxShadow: "1px 10px 50px 4px lightgray",
          }}
          src={university?.buildingImage}
          width={585}
          alt="Image Not Available"
          height={405}
        />
      </div>

      <div className={`col-xxl-6 col-xl-6  col-12`}>
        <h3 className={`font-bold mb-4  ${ScreenLogic ? "" : "text-center"}  `}>
          {university?.title}
        </h3>
        <div
          style={{
            fontSize: "16px",
            color: "black",
            // fontWeight : "bold",
            textAlign: ScreenLogic ? "" : "justify",
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {university.shortDescription}
          </ReactMarkdown>
        </div>
        <div
          className={`mt--30 d-flex gap-3  ${
            ScreenLogic
              ? ""
              : "d-flex align-items-center justify-content-center"
          }  `}
        >
          {university.accredation?.map((data, index) => (
            <div
              className="d-flex justify-center align-items-center"
              style={{ width: "14.4%" }}
            >
              <DynamicImage
                key={index}
                src={data?.accredationImage}
                alt={data?.shortName}
                width={60}
                height={60}
                isShadow={false}
              />
            </div>
          ))}
        </div>
        <div
          className={`mt--30 d-flex gap-3 ${
            ScreenLogic ? "" : "align-items-center justify-content-center"
          } `}
        >
          {university?.courses
            ?.slice(0, ScreenLogic ? 5 : 3)
            ?.map((data, index) => (
              <>
                <div className="rbt-badge-6 bg-secondary-opacity">
                  {data?.shortName}
                </div>
              </>
            ))}
          <div className="rbt-badge-6 bg-primary-opacity">More...</div>
        </div>
        <div className={`mt--20 `}>
          <div
            className="d-flex gap-5"
            style={{ width: ScreenLogic ? "60%" : "" }}
          >
            <button
              className={
                "rbt-btn8 btn-white radius-round-10 hover-icon-reverse"
              }
            >
              <span className="icon-reverse-wrapper">
                <span className="btn-text">Compare</span>
                <span className="btn-icon">
                  <i className="feather-shopping-cart"></i>
                </span>
                <span className="btn-icon">
                  <i className="feather-shopping-cart"></i>
                </span>
              </span>
            </button>
            <button
              onClick={() => setIsOpen(true)}
              style={{
                color: "white",
              }}
              className={
                "rbt-btn8 bg-violet-opacity  radius-round-10 hover-icon-reverse"
              }
            >
              <span className="icon-reverse-wrapper">
                <span className="btn-text">Apply Now</span>
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
        {/* <h3 className="font-bold mb-4">{university.title}</h3> */}
      </div>
    </div>
  );
};

export default UniversityTop;

{
  /* <p className="text-gray-700">{university.About1}</p>
  <br />
  <p className="text-gray-700">{university.About2}</p> */
}
