"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./coursebtn.module.css"
import { useState } from "react";
import { toast } from "react-toastify";

const AdminCourseWidget = ({ data, onEdit, onDelete }) => {

  const [actionLoading, setActionLoading] = useState(false);
  const discountPercentage =
    data.coursePrice && data.offerPrice
      ? Math.round(
        ((data.coursePrice - data.offerPrice) / data.coursePrice) * 100
      )
      : null;


  const thumbnail =
    data.courseImg?.url
      ? `${data.courseImg.url}?v=${data.updatedAt || Date.now()}`
      : data.courseListImg || "/images/course/course-online-01.jpg";


  const handleDelete = async () => {
    if (actionLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmed) return;

    setActionLoading(true);
    try {
      await onDelete(data.courseId);
      toast.success("Course deleted successfully 🗑️");
    } catch (err) {
      toast.error("Failed to delete course ❌");
    } finally {
      setActionLoading(false);
    }
  };


  return (
    <div className="rbt-card variation-01 rbt-hover">

      {/* IMAGE */}
      <div className="rbt-card-img">
        <Link href={`/course-details/${data.courseId}`}>
          <Image
            width={330}
            height={227}
            src={thumbnail}
            alt={data.title}
            style={{ objectFit: "contain" }}
          />
          {discountPercentage && (
            <div className="rbt-badge-3 bg-white">
              <span>-{discountPercentage}%</span>
              <span>Off</span>
            </div>
          )}
        </Link>
      </div>

      {/* BODY */}
      <div className="rbt-card-body">

        {/* TOP */}
        {/* <div className="rbt-card-top">
          <div className="rbt-review">
            <div className="rating">
              {Array.from(
                { length: Math.round(data.rating || 0) },
                (_, i) => (
                  <i className="fas fa-star" key={i} />
                )
              )}
            </div>
            <span className="rating-count">
              ({data.totalReviews || 0} Reviews)
            </span>
          </div>
        </div> */}

        {/* TITLE */}
        <h4 className="rbt-card-title"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.4em",
            maxHeight: "2.8em",
          }}>
          <Link href={`/course-details/${data.courseId}`}>
            {data.title}
          </Link>
        </h4>

        {/* META */}
        <ul className="rbt-meta">
          <li>
            <i className="feather-book" /> {data.lectures || 0} Lessons
          </li>

        </ul>

        {/* PRICE */}
        <div className="rbt-card-bottom">
          <div className="rbt-price">
            <span className="current-price">
              ₹{data.offerPrice}
            </span>
            <span className="off-price">
              ₹{data.coursePrice}
            </span>
          </div>
        </div>

        {/* ADMIN ACTIONS */}
        <div className="mt-3 d-flex gap-2">
          <button
            className={`${styles["vr-btn"]} ${styles["vr-btn-warning"]} ${styles["vr-btn-sm"]} w-100`}
            onClick={() => onEdit(data)}
            disabled={actionLoading}
          >
            Edit
          </button>

          <button
            className={`${styles["vr-btn"]} ${styles["vr-btn-danger"]} ${styles["vr-btn-sm"]} w-100`}
            onClick={handleDelete}
            disabled={actionLoading}
          >
            {actionLoading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminCourseWidget;
