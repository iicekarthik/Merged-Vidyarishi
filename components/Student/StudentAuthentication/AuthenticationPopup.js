"use client";
import { useAppContext } from "@/context/Context";
import { useEffect } from "react";
import { useScreenSize } from "@/hooks/screenSize";
import LoginRegisterForm from "./LoginRegisterForm";
import StepperLogin from "./StepperLogin";

const AuthenticationPopup = () => {
  const { IsOpenLoginModal, setIsOpenLoginModal } = useAppContext();
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  // 🔒 Disable background scroll when modal is open
  useEffect(() => {
    if (IsOpenLoginModal) {
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
  }, [IsOpenLoginModal]);

  if (!IsOpenLoginModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0, // top:0, right:0, bottom:0, left:0
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 11111,
        padding: BigScreenLogic ? "0" : "20px",
        // pointerEvents: "auto",
      }}
      onClick={() => setIsOpenLoginModal(false)}
    >
      <div
        style={{
          width: "auto",
          // maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "10px",
          padding: "0",
          position: "relative",
          zIndex: 999999999,
          animation: "fadeInUp 0.35s ease-out",
          pointerEvents: "auto", // modal content clickable
        }}
        // optional: stop bubbling just in case
        onClick={(e) => e.stopPropagation()}
      >
        <StepperLogin />

        {/* Explicit close button only */}
        <button
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            background: "#ffffff",
            borderRadius: "50%",
            height: "35px",
            width: "35px",
            border: "1px solid #ccc",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsOpenLoginModal(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthenticationPopup;
