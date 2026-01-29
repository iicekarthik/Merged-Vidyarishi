"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseModal from "@/components/Admin/Courses/CourseModal";

const AdminDashboardHeader = () => {
  const [admin, setAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false); // ✅ NEW
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();
        setAdmin(data.admin);
      } catch (err) {
        router.replace("/");
      }
    };

    fetchAdmin();
  }, []);

  if (!admin) return null;

  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="tutor-bg-photo bg_image bg_image--23 height-350" />
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              {/* <Image
                width={250}  //300
                height={130}   //300
                src="/images/team/avatar-2.jpg"
                alt="Admin"
              /> */}
              <Image
                width={250}
                height={130}
                src={admin.profilePhoto?.url || "/images/team/avatar-2.jpg"}
                alt="Admin"
                className="rounded-circle"
              />
            </div>

            <div className="tutor-content">
              <h5 className="title">{admin.fullName}</h5>
              <span className="subtitle">Administrator</span>
            </div>
          </div>

          <div className="rbt-tutor-information-right">
            <div className="tutor-btn">
              {/* ✅ OPEN MODAL */}
              <button
                className="rbt-btn btn-md hover-icon-reverse"
                onClick={() => setShowModal(true)}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Create a New Course</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ COURSE MODAL */}
      {showModal && (
        <CourseModal
          close={() => setShowModal(false)}
          refresh={() => { }}   // pass fetchCourses if needed
          editData={null}      // null = Create mode
        />
      )}
    </>
  );
};

export default AdminDashboardHeader;
