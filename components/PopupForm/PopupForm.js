"use client";
import { useAppContext } from "@/context/Context";
import { useState, useEffect } from "react";
import ContactForm from "../Contacts/Contact-Form";
import EnquiryForm from "../Contacts/EnquiryForm";
import { useScreenSize } from "@/hooks/screenSize";

const PopupForm = ({ TimeOutSeconds }) => {
  const { isOpen, setIsOpen } = useAppContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
      // document.body.style.overflow = "hidden";
      // document.body.style.height = "100vh";
    }, TimeOutSeconds); // 5000ms delay

    return () => {
      clearTimeout(timeout); // Timeout clear karo
      // document.body.style.overflow = "";
      // document.body.style.height = "";
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);

    // Jab modal close ho, scroll allow karo
    document.body.style.overflow = "";
    document.body.style.height = "";
  };

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    isOpen && (
      <>
        {/* <style jsx>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style> */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: 11111,
            width: "100vw",
            height: BigScreenLogic ? "100vh" : "100%",
            overflow: "hidden",
          }}
          // className="pr--20 pl--20"
          onClick={() => setIsOpen(false)} // 👈 Close modal on background click
        >
          <div
            style={{
              // background: "#fff",
              // padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              width: "420px",
              maxWidth: "420px",
              padding: BigScreenLogic ? "0" : "0 20px",
              animation: "fadeInUp 0.4s ease-out",
            }}
            onClick={(e) => e.stopPropagation()} // 👈 Prevent modal close on content click
          >
            <EnquiryForm
              description={""}
              buttonName={"Enquire Now"}
              InputFontSize={"14px"}
              Inputheight={"40px"}
              SelectPadding={"0px 10px"}
              isEnquiryButton={true}
              isFormInputMarginTop="10"
            />
          </div>
        </div>
      </>
    )
  );
};

export default PopupForm;
