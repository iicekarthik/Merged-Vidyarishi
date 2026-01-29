import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context, { useAppContext } from "@/context/Context";
import api from "@/vidyarishiapi/lib/axios";
import sal from "sal.js";
import { toast } from "react-toastify";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Cart from "@/components/Student/Student-dashboard/Cart";
import BackToTop from "@/pages/backToTop";
import Separator from "@/components/Common/Separator";
import CourseHead from "@/components/Course-Details/Course-Sections/course-head";
import CourseDetailsOne from "@/components/Course-Details/CourseDetails-One";
import PageHead from "@/pages/Head";
import SimilarCourses from "@/components/Course-Details/Course-Sections/SimilarCourses";
import { handleBuyNow } from "@/vidyarishiapi/utils/buyNow";
import FooterThree from "@/components/Footer/Footer-Three";

/* ---------------------------------------------------
   INNER COMPONENT (Context-safe)
--------------------------------------------------- */
const CourseEnrollHandler = ({
  course,
  courseContent,
  isEnrolled,
  setIsEnrolled,
  isCompleted,
  courseId,
}) => {
  const { user, setIsOpenLoginModal } = useAppContext();
  const router = useRouter();
  // const handleEnroll = async () => {
  //   // 🔐 Not logged in → open login modal
  //   if (!user) {
  //     localStorage.setItem(
  //       "postLoginAction",
  //       JSON.stringify({
  //         action: "enroll",
  //         payload: { courseId },
  //         redirectTo: `/course-details/${courseId}`,
  //       })
  //     );

  //     setIsOpenLoginModal(true);
  //     toast.info("Please login to enroll in this course");
  //     return;
  //   }

  //   // 🚫 Admin blocked
  //   if (user.role === "admin" || user.isAdmin) {
  //     toast.error("Admins cannot enroll in courses");
  //     return;
  //   }

  //   // ✅ Enroll user
  //   try {
  //     await api.post("/api/dashboard/student/lms/enroll", { courseId });
  //     setIsEnrolled(true);
  //     toast.success("Successfully enrolled 🎉");
  //   } catch (err) {
  //     const status = err.response?.status;
  //     const msg = err.response?.data?.message?.toLowerCase() || "";

  //     if (msg.includes("completed")) {
  //       toast.info("You have already completed this course 🎓");
  //     } else if (status === 409 || msg.includes("already")) {
  //       toast.info("You are already enrolled in this course");
  //     } else {
  //       toast.error("Enrollment failed");
  //     }
  //   }

  // };

  const handleEnroll = () => {
    handleBuyNow({
      user,
      course,
      router,
      setIsOpenLoginModal,
    });
  };

  return (
    <CourseDetailsOne
      checkMatchCourses={course}
      courseContent={courseContent}
      isEnrolled={isEnrolled}
      isCompleted={isCompleted}
      onEnroll={handleEnroll}
      user={user}
    />
  );
};

/* ---------------------------------------------------
   MAIN PAGE
--------------------------------------------------- */
const SingleCoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const { user } = useAppContext(); // ✅ REQUIRED
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseContent, setCourseContent] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  // Scroll animation
  useEffect(() => {
    sal({ threshold: 0.01, once: true });
  }, []);

  // Fetch course + content
  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        const res = await api.get(
          `/api/admin/courses/get-by-id?courseId=${courseId}`
        );
        setCourse(res.data.course);

        const contentRes = await api.get(
          `/api/course-content/get-by-courseId?courseId=${courseId}`
        );
        setCourseContent(contentRes.data.sections || []);
      } catch (err) {
        console.error("Course not found", err);
        router.replace("/course-filter-one-toggle");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  // Check enrollment
  useEffect(() => {
    if (!courseId) return;

    const checkEnrollment = async () => {
      try {
        const res = await api.get("/api/dashboard/student/enrolled-courses");
        const enrolled = res.data.find(
          (c) => c.courseId === Number(courseId)
        );

        if (enrolled) {
          setIsEnrolled(true);
          setIsCompleted(enrolled.isCompleted === true);

          const isQuizOnlyCourse =
            courseContent.length === 0 && enrolled.hasQuiz;

          if (isQuizOnlyCourse && !enrolled.quizPassed) {
            router.replace(`/course-player/${courseId}/quiz`);
          }
        }
        else {
          setIsEnrolled(false);
          setIsCompleted(false);
        }
      } catch (err) {
        console.error("Enrollment check failed");
      }
    };

    checkEnrollment();

  }, [courseId, user]); // ✅ RE-RUN AFTER LOGIN

  useEffect(() => {
    if (!course?.category || !course?.courseId) return;

    const fetchRelatedCourses = async () => {
      try {
        const res = await api.get(
          "/api/course-content/related-by-category",
          {
            params: {
              category: course.category,
              courseId: course.courseId,
            },
          }
        );

        setRelatedCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to load related courses");
      }
    };

    fetchRelatedCourses();
  }, [course]);

  if (loading || !course) return null;

  return (
    <>
      <PageHead title={`${course.title} - Course Details`} />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="" headerType={true} />
          <Cart />

          {/* Header */}
          {/* <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3"> */}
          <div className="">
            <CourseHead
              checkMatch={course}
              courseContent={courseContent}
              isEnrolled={isEnrolled}
            />
          </div>

          {/* Course Details */}
          <div className="rbt-course-details-area pt--80">
            <div className="container">
              <div className="row g-5">
                <CourseEnrollHandler
                  course={course}
                  courseContent={courseContent}
                  isEnrolled={isEnrolled}
                  setIsEnrolled={setIsEnrolled}
                  isCompleted={isCompleted}
                  courseId={courseId}
                />
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          {/* <CourseActionBottom checkMatchCourses={course} /> */}

          {/* Similar Courses */}
          {Array.isArray(relatedCourses) && relatedCourses.length > 0 && (
            <div className="rbt-related-course-area bg-color-white pt--60 rbt-section-gapBottom">
              <div className="horizontal-scroll-wrapper">
                <SimilarCourses courses={relatedCourses} />
              </div>
            </div>
          )}

          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default SingleCoursePage;