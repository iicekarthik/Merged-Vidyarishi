import React from "react";
import { getCourseStats } from "@/vidyarishiapi/utils/courseStats";

const CourseBanner = ({ course, courseContent }) => {
  if (!course) return null;

  // ✅ Calculate total lectures dynamically
  const { totalLectures, durationLabel } =
    getCourseStats(courseContent);

  const divider = (
    <div
      style={{
        width: "1px",
        height: "36px",
        background: "#e5e8f3",
      }}
    />
  );

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "180px",
  };

  const labelStyle = {
    fontSize: "13px",
    color: "#64748b",
    display: "block",
  };

  const valueStyle = {
    fontSize: "15px",
    fontWeight: "600",
    color: "#0f172a",
  };

  const iconStyle = {
    fontSize: "26px",
    color: "#3b5cff",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#ffffff",
        borderRadius: "10px",
        border: "1px solid #e5e8f3",
        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
        padding: "18px 20px",
        gap: "16px",
        // padding: "12px 10px",
        // gap: "12px",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Duration */}
      <div style={itemStyle}>
        <i className="feather-clock" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>Duration</span>
          <strong style={valueStyle}>
            {durationLabel}
          </strong>
        </div>
      </div>

      {divider}

      {/* Lectures */}
      <div style={itemStyle}>
        <i className="feather-book" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>Lectures</span>
          <strong style={valueStyle}>{totalLectures}</strong>
        </div>
      </div>

      {divider}

      {/* Eligibility */}
      <div style={itemStyle}>
        <i className="feather-user-check" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>Eligibility</span>
          <strong style={valueStyle}>
            {course.meta?.eligibility || "Any Graduate"}
          </strong>
        </div>
      </div>

      {divider}

      {/* Fees */}
      <div style={itemStyle}>
        <i className="feather-credit-card" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>Fees</span>
          <strong style={valueStyle}>
            ₹{course.offerPrice}
          </strong>
        </div>
      </div>

      {divider}

      {/* Average Salary */}
      <div style={itemStyle}>
        <i className="feather-briefcase" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>Average Salary</span>
          <strong style={valueStyle}>
            {course.meta?.averageSalary || "—"}
          </strong>
        </div>
      </div>

      {divider}

      {/* EMI */}
      <div style={itemStyle}>
        <i className="feather-check-circle" style={iconStyle}></i>
        <div>
          <span style={labelStyle}>EMI</span>
          <strong style={valueStyle}>
            {course.meta?.emiAvailable ? "Available" : "Not Available"}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CourseBanner;



{/* <Image
        className="w-100"
        src={bannerImg}
        width={800}
        height={550}
        priority
        alt="Card image"
      /> */}