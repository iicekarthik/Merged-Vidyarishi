import React from "react";
import EnquiryForm from "./EnquiryForm";

const EnquiryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Pass showClose and onClose only in modal */}
        <EnquiryForm onClose={onClose} showClose={true} />
      </div>
    </div>
  );
};

export default EnquiryModal;

