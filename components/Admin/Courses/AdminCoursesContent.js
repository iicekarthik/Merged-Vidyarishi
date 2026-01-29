"use client";

import { useEffect, useState } from "react";
import CourseModal from "./CourseModal";
import AdminCourseWidget from "@/components/Admin/Courses/AdminCourseWidget";
import styles from "./coursebtn.module.css";

const AdminCoursesContent = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses/get-all");
      const data = await res.json();
      setCourses(data?.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  return (
    <>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="rbt-title-style-3 h-20">Admin Courses</h3>
        <button
          className="rbt-btn3 btn-gradient"
          onClick={() => setOpen(true)}
        >
          + Add Course
        </button>
      </div>

      {/* COURSE CARDS (POPULAR STYLE) */}
      <div style={{ maxHeight: "65vh", overflowY: "auto", paddingRight: "8px" }}>
        <div className="row g-4">
          {courses.map((course) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              key={course.courseId}
            >
              <AdminCourseWidget
                data={{
                  ...course,
                  courseImg: course.courseImg || "/images/course/course-online-01.jpg",
                }}
                onEdit={(course) => {
                  setEditData(course);
                  setOpen(true);
                }}
                onDelete={async (id) => {

                  await fetch("/api/admin/courses/delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ courseId: id }), // see FIX #2
                  });

                  fetchCourses();
                }}
              />

            </div>
          ))}
        </div>
      </div>
      {/* MODAL */}
      {open && (
        <CourseModal
          close={() => {
            setOpen(false);
            setEditData(null);
          }}
          refresh={fetchCourses}
          editData={editData}
        />
      )}
    </>
  );
};

export default AdminCoursesContent;
