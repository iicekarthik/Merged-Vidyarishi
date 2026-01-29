import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import "venobox/dist/venobox.min.css";
import { getCourseStats } from "@/vidyarishiapi/utils/courseStats";
import { useAppContext } from "@/context/Context";
import { toast } from "react-toastify";

// ⏱ Convert "MM:SS" → total seconds
const toSeconds = (time) => {
  if (!time || typeof time !== "string") return 0;

  const parts = time.split(":").map(Number);

  // Supports "MM:SS" or "HH:MM:SS"
  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }

  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }

  return 0;
};

// ⏱ Convert seconds → "MM:SS"
const toTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const CourseLessonProp = ({
  courseId,
  courseContent = [],
  isEnrolled = false,
  isCompleted = false,
  onEnroll,
  user,
}) => {
  const router = useRouter();
  const isAdmin = user?.isAdmin || user?.role === "admin";

  const { setIsOpenLoginModal } = useAppContext();

  const isQuizOnlyCourse =
    Array.isArray(courseContent) && courseContent.length === 0;

  const courseStats = !isQuizOnlyCourse
    ? getCourseStats(courseContent)
    : null;

  const totalLectures = courseStats?.totalLectures ?? 0;
  const durationLabel = courseStats?.durationLabel ?? "";

  const handleLockedClick = () => {
    // 🔐 Not logged in → SAME flow as Enroll button
    if (!user) {
      localStorage.setItem(
        "postLoginAction",
        JSON.stringify({
          action: "viewLesson",
          payload: { courseId },
          redirectTo: `/course-details/${courseId}`,
        })
      );

      setIsOpenLoginModal(true);
      toast.info("Please login to access this lesson");
      return;
    }

    // 🚫 Logged in but not enrolled
    toast.info("Please enroll in the course to unlock this lesson");
  };

  useEffect(() => {
    let vb;

    import("venobox/dist/venobox.min.js").then((venobox) => {
      vb = new venobox.default({
        selector: ".popup-video",
        spinner: "cube-grid",
        overlayClose: true,   // ✅ click outside to close
        closeButton: true,    // ✅ show X button
        keyboard: true,       // ✅ ESC key works
        autoplay: true,
        maxWidth: "90%",
      });
    });

    return () => {
      if (vb && vb.destroy) vb.destroy(); // ✅ cleanup
    };
  }, []);

  if (!Array.isArray(courseContent)) return null;

  // 🔢 Overall stats
  // const totalVideos = courseContent.reduce(
  //   (sum, sec) => sum + sec.videos.length,
  //   0
  // );

  // const totalDurationSeconds = courseContent.reduce(
  //   (sum, sec) =>
  //     sum + sec.videos.reduce((s, v) => s + toSeconds(v.duration), 0),
  //   0
  // );
  // const { totalLectures, durationLabel } = getCourseStats(courseContent);

  return (
    <div className="row gy-5 row--30">
      <div className="col-lg-12 rbt-scroll-max-height rbt-scroll">
        <div className="course-content">

          {/* OVERALL STATS */}
          {!isQuizOnlyCourse && (
            <div className="mb--20">
              <h5>
                {totalLectures} Lectures • {durationLabel} Total Length
              </h5>
            </div>
          )}

          {/* ENROLL BUTTON (ONCE) */}
          {!isQuizOnlyCourse && !isEnrolled && !isCompleted && !isAdmin && (
            <button
              className="rbt-btn btn-gradient w-80 mb--20"
              onClick={onEnroll}
            >
              Enroll Now
            </button>
          )}

          {!isQuizOnlyCourse && isEnrolled && !isCompleted && (
            <button
              className="rbt-btn btn-border w-80 mb--20"
              onClick={() => router.push(`/course-player/${courseId}`)}
            >
              Continue Learning
            </button>
          )}


          {!isQuizOnlyCourse && isCompleted && (
            <div className="rbt-badge bg-success-opacity mb--20">
              ✔ Course Completed
            </div>
          )}

          {isQuizOnlyCourse && (
            <div className="rbt-alert alert-info mb--30">
              <h5 className="mb--10">📝 Final Quiz Available</h5>
              <p className="mb--15">
                This course consists of a final assessment only.
                Complete the quiz to unlock your certificate.
              </p>

              {!isEnrolled && (
                <button
                  className="rbt-btn btn-gradient"
                  onClick={onEnroll}
                >
                  Enroll & Take Quiz
                </button>
              )}

              {isEnrolled && !isCompleted && (
                <button
                  className="rbt-btn btn-gradient"
                  onClick={() =>
                    router.push(`/course-player/${courseId}/quiz`)
                  }
                >
                  Take Final Quiz
                </button>
              )}

              {isCompleted && (
                <div className="d-flex flex-wrap gap-3">
                  <div className="rbt-badge bg-success-opacity">
                    ✔ Quiz Completed • Certificate Unlocked
                  </div>

                  <button
                    className="rbt-badge bg-success-opacity"
                    onClick={() =>
                      window.open(
                        `/api/dashboard/student/lms/certificate/generate?courseId=${courseId}`,
                        "_blank"
                      )
                    }
                  >
                    🎓 Download Certificate
                  </button>
                </div>
              )}

            </div>
          )}

          {/* SECTIONS */}
          {!isQuizOnlyCourse && (

            <div className="rbt-accordion-style rbt-accordion-02 right-no-padding accordion">
              <div className="accordion" id="accordionExampleb2">
                {courseContent.map((section, index) => {
                  const lectureCount = section.videos.length;
                  const totalDuration = section.videos.reduce(
                    (sum, v) => sum + toSeconds(v.duration),
                    0
                  );

                  return (
                    <div className="accordion-item card" key={section.sectionId}>
                      <h2 className="accordion-header card-header">
                        <button
                          className={`accordion-button ${index === 0 ? "" : "collapsed"
                            }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse-${index}`}
                        >
                          {section.title}
                          <span className="ms-auto small text-muted">
                            {lectureCount} Lectures • {toTime(totalDuration)}
                          </span>
                        </button>
                      </h2>

                      <div
                        id={`collapse-${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                          }`}
                      >
                        <div className="accordion-body card-body">
                          <ul className="rbt-course-main-content liststyle">
                            {section.videos.map((video, videoIndex) => {
                              const isFirstSection = index === 0;
                              const isFirstVideo = videoIndex === 0;
                              const isDemoVideo = isFirstSection && isFirstVideo;

                              const locked = !isAdmin && !isEnrolled && !isDemoVideo;

                              return (
                                <li key={video.videoId}>
                                  {locked ? (
                                    <div
                                      className="d-flex justify-content-between align-items-center cursor-pointer"
                                      onClick={handleLockedClick}
                                    >
                                      <div className="course-content-left">
                                        <i className="feather-lock"></i>
                                        <span className="text">{video.title}</span>
                                      </div>
                                      <span className="rbt-badge bg-secondary-opacity">
                                        Locked
                                      </span>
                                    </div>
                                  ) : (
                                    <Link href={`/course-player/${courseId}`}>
                                      <div className="course-content-left">
                                        <i className="feather-play-circle"></i>
                                        <span className="text">
                                          {video.title}
                                          {isDemoVideo && !isAdmin && (
                                            <span className="ms-2 rbt-badge bg-success-opacity">
                                              Demo
                                            </span>
                                          )}
                                        </span>
                                      </div>
                                      <div className="course-content-right">
                                        <span className="rbt-badge bg-primary-opacity">
                                          {video.duration}
                                        </span>
                                      </div>
                                    </Link>
                                  )}
                                </li>
                              );
                            })}

                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};


export default CourseLessonProp;
