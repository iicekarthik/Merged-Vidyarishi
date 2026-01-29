import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/vidyarishiapi/lib/axios";
import PageHead from "@/pages/Head";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import BackToTop from "@/pages/backToTop";
import Separator from "@/components/Common/Separator";
import { toast } from "react-toastify";
import Context, { useAppContext } from "@/context/Context";
import { handleBuyNow } from "@/vidyarishiapi/utils/buyNow";
import FooterThree from "@/components/Footer/Footer-Three";

const CoursePlayer = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { user, setIsOpenLoginModal } = useAppContext();

  const [course, setCourse] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [completedSections, setCompletedSections] = useState([]);
  const isAdmin = user?.isAdmin || user?.role === "admin";

  const [quizPassed, setQuizPassed] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);

  const checkEnrollment = async () => {
    try {
      const res = await api.get("/api/dashboard/student/enrolled-courses");
      const enrolledCourse = res.data.find(
        (c) => c.courseId === Number(courseId)
      );

      if (enrolledCourse) {
        setIsEnrolled(true);
        setIsCompleted(enrolledCourse.isCompleted === true);
        setCompletedVideos(enrolledCourse.completedVideos || []);
        setCompletedSections(enrolledCourse.completedSections || []);
        setQuizPassed(enrolledCourse.quizPassed === true);

      } else {
        setIsEnrolled(false);
        setIsCompleted(false);
      }
    } catch (err) {
      setIsEnrolled(false);
    }
  };

  useEffect(() => {
    if (!courseId) return;
    const initPlayer = async () => {
      try {
        // ================= ADMIN ACCESS =================
        if (isAdmin) {
          const courseRes = await api.get(
            `/api/admin/courses/get-by-id?courseId=${courseId}`
          );
          setCourse(courseRes.data.course);

          const contentRes = await api.get(
            `/api/course-content/get-by-courseId?courseId=${courseId}`
          );

          const sections = contentRes.data.sections || [];
          setCourseContent(sections);
          setHasQuiz(contentRes.data.quiz?.questions?.length > 0);


          if (!sections.length || !sections[0].videos.length) {
            setLoading(false);
            return;
          }

          setCurrentVideo({
            ...sections[0].videos[0],
            sectionId: sections[0].sectionId,
          });

          setIsEnrolled(true); // 🔓 unlock everything
          setLoading(false);
          return;
        }

        // ================= STUDENT / DEMO FLOW =================
        let enrolled = null;

        try {
          const enrollRes = await api.get(
            "/api/dashboard/student/enrolled-courses"
          );

          enrolled = enrollRes.data.find(
            (c) => c.courseId === Number(courseId)
          );
        } catch {
          enrolled = null;
        }

        if (!enrolled) {
          const contentRes = await api.get(
            `/api/course-content/get-by-courseId?courseId=${courseId}`
          );

          const sections = contentRes.data.sections || [];
          setCourseContent(sections);
          setHasQuiz(contentRes.data.quiz?.questions?.length > 0);


          const courseRes = await api.get(
            `/api/admin/courses/get-by-id?courseId=${courseId}`
          );
          setCourse(courseRes.data.course);

          const demoVideo = {
            ...sections[0].videos[0],
            sectionId: sections[0].sectionId,
            isDemo: true,
          };

          setCurrentVideo(demoVideo);
          setIsEnrolled(false);
          setLoading(false);
          return;
        }

        await checkEnrollment();

        const courseRes = await api.get(
          `/api/admin/courses/get-by-id?courseId=${courseId}`
        );
        setCourse(courseRes.data.course);

        const contentRes = await api.get(
          `/api/course-content/get-by-courseId?courseId=${courseId}`
        );

        const sections = contentRes.data.sections || [];
        setCourseContent(sections);
        setHasQuiz(contentRes.data.quiz?.questions?.length > 0);


        let resumeVideo = null;
        const completed = enrolled.completedVideos || [];

        for (const section of sections) {
          for (const video of section.videos) {
            if (!completed.includes(video.videoId)) {
              resumeVideo = { ...video, sectionId: section.sectionId };
              break;
            }
          }
          if (resumeVideo) break;
        }

        setCurrentVideo(resumeVideo || {
          ...sections[0].videos[0],
          sectionId: sections[0].sectionId,
        });

      } catch (err) {
        console.error("Failed to load course player", err);
        router.replace(`/course-details/${courseId}`);
      } finally {
        setLoading(false);
      }
    };

    initPlayer();

  }, [courseId, router, user]);

  const markCompleted = async (videoId, sectionId) => {
    // ✅ Already completed guard
    if (completedVideos.includes(videoId)) {
      toast.info("This video is already completed ✅");
      return;
    }

    try {
      const res = await api.post(
        "/api/dashboard/student/lms/progress/complete-video",
        {
          courseId: Number(courseId),
          sectionId,
          videoId,
        }
      );

      const progress = res.data?.progress;
      if (!progress) return;

      // ✅ Update state from backend
      setCompletedVideos(progress.completedVideos || []);
      setCompletedSections(progress.completedSections || []);
      setIsCompleted(progress.isCompleted === true);

      // ▶️ Auto-play next allowed video (USING BACKEND DATA)
      let nextVideo = null;

      for (const section of courseContent) {
        for (const video of section.videos) {
          if (!progress.completedVideos.includes(video.videoId)) {
            nextVideo = {
              ...video,
              sectionId: section.sectionId,
            };
            break;
          }
        }
        if (nextVideo) break;
      }

      if (nextVideo) {
        setCurrentVideo(nextVideo);
      }

    } catch (err) {
      console.error("Failed to mark video completed", err);
    }
  };

  const getNextAllowedVideoId = () => {
    for (const section of courseContent) {
      for (const video of section.videos) {
        if (!completedVideos.includes(video.videoId)) {
          return video.videoId; // first incomplete video
        }
      }
    }
    return null;
  };

  const nextAllowedVideoId = getNextAllowedVideoId();

  const totalVideos = courseContent.reduce(
    (sum, sec) => sum + sec.videos.length,
    0
  );

  const allVideosCompleted =
    totalVideos > 0 && completedVideos.length === totalVideos;

  const progressPercent =
    totalVideos === 0
      ? 0
      : Math.round((completedVideos.length / totalVideos) * 100);


  useEffect(() => {
    if (!courseId || !user) return;
    checkEnrollment();
  }, [courseId, user]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);
  const getYoutubeId = (url) => {
    if (!url) return "";
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    );
    return match ? match[1] : "";
  };

  // 🔒 SAFETY GUARDS
  if (loading) return <p>Loading...</p>;
  // if (!isEnrolled) return null;
  // if (!course) return null;
  if (!currentVideo) return <p>No video available</p>;

  return (
    <>
      <PageHead title={`${course.title} - Course Player`} />

      <MobileMenu />
      <HeaderStyleTen headerSticky="" headerType={true} />

      <div className="container pt--40">
        <div className="row">
          {/* VIDEO PLAYER */}
          <div className="col-lg-8">
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="420"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  currentVideo.videoUrl
                )}?controls=0&rel=0&modestbranding=1&disablekb=1`}
                title={currentVideo.title}
                allowFullScreen
              />
              <div className="yt-overlay" />
            </div>


            {/* <iframe
              width="100%"
              height="420"
              src={currentVideo.videoUrl.replace("watch?v=", "embed/")}
              title={currentVideo.title}
              allowFullScreen
            /> */}
            <h4 className="mt--20">{currentVideo.title}</h4>

            {/* // BUTTON LOGIC — DO NOT CHANGE THIS */}
            {/* MARK AS COMPLETED */}
            {!isCompleted && isEnrolled && !isAdmin && (
              <button
                className="rbt-btn btn-gradient mt--20 mb--10"
                disabled={completedVideos.includes(currentVideo.videoId)}
                onClick={() =>
                  markCompleted(
                    currentVideo.videoId,
                    currentVideo.sectionId
                  )
                }
              >
                Mark as Completed
              </button>
            )}

            {/* {currentVideo.isDemo && !isEnrolled && !isAdmin && (
              <div className="mt--20">
                {!user ? (
                  <>
                    <p className="mt--10 text-muted">
                      Login to enroll and unlock the full course.
                    </p>

                    <button
                      className="rbt-btn btn-gradient mb--10"
                      onClick={() => {
                        localStorage.setItem(
                          "postLoginAction",
                          JSON.stringify({
                            action: "enroll",
                            payload: { courseId },
                            redirectTo: `/course-player/${courseId}`,
                          })
                        );

                        setIsOpenLoginModal(true);
                        toast.info("Please login to enroll in this course");
                      }}
                    >
                      <i className="feather-log-in"></i> Login to Enroll
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt--10 text-muted">
                      You are logged in. Enroll to unlock the full course.
                    </p>

                    <button
                      className="rbt-btn btn-gradient mb--10"
                      onClick={() => {
                        localStorage.setItem(
                          "postLoginAction",
                          JSON.stringify({
                            action: "enroll",
                            payload: { courseId },
                          })
                        );

                        router.push(`/course-details/${courseId}`);
                      }}
                    >
                      <i className="feather-log-in"></i> Enroll Now
                    </button>
                  </>
                )}
              </div>
            )} */}

            {currentVideo.isDemo && !isEnrolled && !isAdmin && (
              <div className="mt--20">
                <p className="mt--10 text-muted">
                  Enroll to unlock the full course.
                </p>

                <button
                  className="rbt-btn btn-gradient mb--10"
                  onClick={() =>
                    handleBuyNow({
                      user,
                      course,
                      router,
                      setIsOpenLoginModal,
                    })
                  }
                >
                  <i className="feather-log-in"></i> Enroll Now
                </button>
              </div>
            )}

            {/* QUIZ + CERTIFICATE BUTTONS */}
            {isEnrolled && allVideosCompleted && hasQuiz && (
              <div className="d-flex flex-wrap gap-3 mt--20 mb--10">
                {!quizPassed ? (
                  <button
                    className="rbt-btn btn-gradient"
                    onClick={() =>
                      router.push(`/course-player/${courseId}/quiz`)
                    }
                  >
                    Take Final Quiz
                  </button>
                ) : (
                  <button
                    className="rbt-btn btn-border"
                    onClick={() =>
                      router.push(`/course-player/${courseId}/quiz`)
                    }
                  >
                    ✅ Quiz Completed
                  </button>
                )}

                {quizPassed && (
                  <button
                    className="rbt-btn btn-border"
                    onClick={() =>
                      window.open(
                        `/api/dashboard/student/lms/certificate/generate?courseId=${courseId}`,
                        "_blank"
                      )
                    }
                  >
                    🎓 Download Certificate
                  </button>
                )}
              </div>
            )}

          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4">
            {isEnrolled && !isAdmin && (

              <div className="mb--20">
                <div style={{ fontSize: "14px", marginBottom: 6 }}>
                  Progress: {progressPercent}%
                </div>


                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "#eee",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: "100%",
                      background: "#2f57ef",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {courseContent.map((section, sectionIndex) => (
              <div key={section.sectionId} className="mb--20">
                <h6>{section.title}</h6>

                <ul>
                  {section.videos.map((video, videoIndex) => {
                    const isDemoVideo =
                      sectionIndex === 0 && videoIndex === 0 && !isEnrolled;

                    const canWatch =
                      isAdmin ||
                      isDemoVideo ||
                      completedVideos.includes(video.videoId) ||
                      video.videoId === nextAllowedVideoId;

                    return (
                      <li
                        key={video.videoId}
                        style={{
                          cursor: canWatch ? "pointer" : "not-allowed",
                          opacity: canWatch ? 1 : 0.4,
                        }}
                        onClick={() => {
                          if (!canWatch && !isAdmin) {
                            toast.warning("Please complete previous video first 🔒");
                            return;
                          }

                          setCurrentVideo({
                            ...video,
                            sectionId: section.sectionId,
                            isDemo: isDemoVideo,
                          });
                        }}
                      >
                        {completedVideos.includes(video.videoId) ? "✔" : "▶"}{" "}
                        {video.title}

                        {isDemoVideo && !isAdmin && (
                          <span className="ms-2 rbt-badge bg-success-opacity">
                            Demo
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      <BackToTop />
      <Separator />
      <FooterThree />
    </>
  );
};

export default CoursePlayer;