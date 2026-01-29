import CourseBanner from "./Course-Sections/Course-Banner";
import CourseMenu from "./Course-Sections/Course-Menu";
import Overview from "./Course-Sections/Overview";
import CourseLessonProp from "./Course-Sections/CourseLessonProp";
import FAQ from "./Course-Sections/FAQ";
import CareerScope from "./Course-Sections/Career-Scope";

const CourseDetailsOne = ({
  checkMatchCourses,
  courseContent,
  isEnrolled,
  onEnroll,
  isCompleted,
  user, // ✅ ADD THIS
}) => {

  const isQuizOnlyCourse =
    Array.isArray(courseContent) &&
    courseContent.length === 0 &&
    checkMatchCourses?.contentType === "quizOnly";

  if (!checkMatchCourses?.courseId) return null;

  return (
    <>
      <div>
        {/* Banner */}
        <div>
          {checkMatchCourses.courseImg && (
            <CourseBanner
              course={checkMatchCourses}
              courseContent={courseContent}
            />
          )}
        </div>

        {/* Menu */}
        <div className="rbt-inner-onepage-navigation sticky-top mt--30">
          <CourseMenu />
        </div>

        {/* Overview */}
        {Array.isArray(checkMatchCourses.courseOverview) &&
          checkMatchCourses.courseOverview.map((data, index) => (
            <Overview key={index} checkMatchCourses={data} />
          ))}

        {/* Course Content */}
        <div
          className="course-content rbt-shadow-box coursecontent-wrapper mt--30"
          id="coursecontent"
        >
          {/* {Array.isArray(courseContent) && courseContent.length === 0 && (
            <p className="text-muted">Course content will be available soon.</p>
          )} */}

          {checkMatchCourses?.contentType !== "quizOnly" &&
            Array.isArray(courseContent) &&
            courseContent.length === 0 && (
              <p className="text-muted">Course content will be available soon.</p>
            )}

          <CourseLessonProp
            courseId={checkMatchCourses.courseId}
            courseContent={courseContent}
            isEnrolled={isEnrolled}
            isCompleted={isCompleted}
            onEnroll={onEnroll}
            user={user}   // ✅ REQUIRED
          />
        </div>

        {/* Career Scope */}
        <div
          className="rbt-course-feature-box rbt-shadow-box details-wrapper mt--30"
          id="careerscope"
        >
          <div className="row g-5">
            <CareerScope careerScope={checkMatchCourses?.meta?.careerScope} />
          </div>
        </div>


        {/* FAQ */}
        <div
          className="rbt-course-feature-box rbt-shadow-box details-wrapper mt--30"
          id="faq"
        >
          <div className="row g-5">
            <FAQ faq={checkMatchCourses?.meta?.faq} />
          </div>
        </div>

      </div>

    </>
  );
};

export default CourseDetailsOne;