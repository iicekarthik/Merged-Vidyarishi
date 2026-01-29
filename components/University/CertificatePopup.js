import React, { useEffect } from "react";

const CertificatePopup = ({ CertificateImage, onClose }) => {
  if (!CertificateImage) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="d-flex justify-content-center flex-column"
        style={{
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            // position: "absolute",
            // top: "10px",
            // right: "10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            textAlign: "center",
            width: "30px",
            height: "30px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
          }}
        >
          {/* Certificate Image */}
          <img
            src={CertificateImage}
            alt="Certificate"
            style={{
              width: "60vh",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatePopup;
