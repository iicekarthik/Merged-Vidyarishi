"use client";
import { useEffect } from "react";

const UpdateLeadStatusModal = ({
  show,
  lead,
  status,
  setStatus,
  remark,
  setRemark,
  onClose,
  onSave,
  loading = false,
}) => {
  // Don’t render if closed
  if (!show || !lead) return null;

  // 🔒 Disable background scroll 

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        padding: "20px",
        marginTop: "6em",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "10px",
          padding: "24px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            background: "#fff",
            borderRadius: "50%",
            height: "35px",
            width: "35px",
            border: "1px solid #ccc",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* 🔷 Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eee",
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 600 }}>
            Update Lead Status
          </h4>
          <p style={{ margin: "4px 0 0", color: "#6c757d" }}>
            {lead.fullName} • {lead.phone}
          </p>
        </div>

        {/* 📦 Body */}
        <div style={{ maxHeight: "45vh", overflowY: "auto", paddingRight: "8px" }}>
          <div style={{ padding: "24px" }}>
            <label
              className="form-label"
              style={{ fontWeight: 500 }}
            >
              Lead Status
            </label>

            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                height: "44px",
                borderRadius: "8px",
              }}
            >
              <option value="new">🆕 New</option>
              <option value="contacted">📞 Contacted</option>
              <option value="on_hold">⏸️ On Hold</option>
              <option value="converted">✅ Converted</option>
            </select>

            {/* 📝 Remark */}
            <div style={{ marginTop: "16px" }}>
              <label className="form-label" style={{ fontWeight: 500 }}>
                Remark / Notes
              </label>

              <textarea
                className="form-control"
                rows={3}
                placeholder="Add follow-up note or remark..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                style={{
                  resize: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </div>

          </div>

          {/* 🎓 Course Details */}
          <div style={{ marginTop: "20px" }}>
            <h6 className="mb-2">📚 Course Progress</h6>

            {!lead.enrolledCourses?.length && (
              <p className="text-muted small">No enrolled courses</p>
            )}

            {lead.enrolledCourses?.map((c) => (
              <div
                key={c.courseId}
                style={{
                  padding: "10px",
                  border: "1px solid #eee",
                  borderRadius: "6px",
                  marginBottom: "8px",
                }}
              >
                <strong>{c.title}</strong>
                <div className="small text-muted">
                  Progress: {c.progress}%
                  {c.isCompleted && (
                    <> • ✅ Completed</>
                  )}
                </div>

                {c.completedAt && (
                  <div className="small text-muted">
                    Completed on: {new Date(c.completedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 🔘 Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-outline-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={onSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLeadStatusModal;
