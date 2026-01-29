import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const StudentDashboardHeader = () => {
  const [studentName, setStudentName] = useState("");
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserAndCounts = async () => {
      try {
        const userRes = await axios.get("/api/dashboard/profile/profileroute", {
          withCredentials: true,
        });

        setStudentName(userRes.data.fullName || "User");
        setProfileImage(userRes.data.profileImage?.url || null);

        const courseRes = await axios.get("/api/dashboard/student/enrolled-courses", {
          withCredentials: true,
        });

        const courses = Array.isArray(courseRes.data) ? courseRes.data : [];

        setEnrolledCount(courses.filter(c => c.status === "enrolled").length);
        setCertificateCount(courses.filter(c => c.status === "completed").length);

      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchUserAndCounts();
  }, []);


  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="tutor-bg-photo bg_image bg_image--22 height-350" />
        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              <Image
                width={250}
                height={130}
                src={profileImage || "/images/team/avatar.jpg"}
                alt="Student"
                className="rounded-circle"
              />

            </div>
            <div className="tutor-content">
              <h5 className="title">{studentName}</h5>
              <ul className="rbt-meta rbt-meta-white mt--5">
                <li>
                  <i className="feather-book"></i>
                  {enrolledCount} Courses Enrolled
                </li>

                <li>
                  <i className="feather-award"></i>
                  {certificateCount} Certificate
                </li>

              </ul>
            </div>
          </div>
          {/* <div className="rbt-tutor-information-right">
            <div className="tutor-btn">
              <Link className="rbt-btn btn-md hover-icon-reverse" href="#">
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">Create Link New Course</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </span>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StudentDashboardHeader;
