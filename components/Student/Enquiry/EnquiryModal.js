"use client";
import EnquiryForm from "./EnquiryForm";

const EnquiryModal = ({ courseId, courseName, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000000000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "420px",
          padding: "24px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            height: "36px",
            width: "36px",
            borderRadius: "50%",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        <h3 style={{ marginBottom: "6px" }}>
          Ready to transform your career?
        </h3>
        <p style={{ fontSize: "13px", color: "#667085", marginBottom: "20px" }}>
          Fill the details to download brochure
        </p>

        <EnquiryForm
          courseId={courseId}
          courseName={courseName}
          onSuccess={onClose}
        />

      </div>
    </div>
  );
};

export default EnquiryModal;
