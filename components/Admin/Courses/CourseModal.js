"use client";
// import { useEffect } from "react";
import UpdateCourseDetailsForm from "./Update-Course-Details/UpdateCourseDetailsForm";
import CreateCourseForm from "./Create-Course/CreateCourseForm";
import { useEffect, useState } from "react";
import AdminCourseSections from "./Update-Course-Details/AdminCourseSections";
import styles from "./coursebtn.module.css";
import UpdateCourseMetaForm from "./Update-Course-Details/UpdateCourseMetaForm";

export default function CourseModal({ close, refresh, editData }) {
  // 🔒 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, []);

  const [activeTab, setActiveTab] = useState("details");
  useEffect(() => {
    setActiveTab("details");
  }, [editData]);


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
        marginTop: "6em"
      }}
      onClick={close}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "10px",
          padding: "24px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={close}
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
        <div className="mb-4">
          <h4 className="mb-1">
            {editData ? "Edit Course" : "Add Course"}
          </h4>
          <p className="text-muted mb-0">
            {editData
              ? "Update existing course details"
              : "Create a new course"}
          </p>
        </div>

        {/* 🧠 FORM SWITCH */}
        {/* Tabs */}
        {editData && (
          <div className="d-flex gap-2 mb-2">
            <button
              className={`${styles["vr-btn"]} ${activeTab === "details"
                ? styles["vr-btn-primary"]
                : styles["vr-btn-secondary"]
                }`}
              onClick={() => setActiveTab("details")}
            >
              Course Details
            </button>

            <button
              className={`${styles["vr-btn"]} ${activeTab === "meta"
                  ? styles["vr-btn-primary"]
                  : styles["vr-btn-secondary"]
                }`}
              onClick={() => setActiveTab("meta")}
            >
              Meta & Overview
            </button>

            <button
              className={`${styles["vr-btn"]} ${activeTab === "sections"
                ? styles["vr-btn-primary"]
                : styles["vr-btn-secondary"]
                }`}
              onClick={() => setActiveTab("sections")}
            >
              Sections & Videos
            </button>
          </div>
        )}

        {!editData && (
          <CreateCourseForm close={close} refresh={refresh} />
        )}

        {editData && activeTab === "details" && (
          <UpdateCourseDetailsForm
            close={close}
            refresh={refresh}
            editData={editData}
          />
        )}

        {editData && activeTab === "meta" && (
          <UpdateCourseMetaForm
            courseId={editData.courseId}
            meta={editData.meta}
            courseOverview={editData.courseOverview}
          />
        )}

        {editData && activeTab === "sections" && (
          <AdminCourseSections courseId={editData.courseId} />
        )}

      </div>
    </div>
  );
}
