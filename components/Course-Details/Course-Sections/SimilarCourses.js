import Image from "next/image";
import Link from "next/link";
import React from "react";

const SimilarCourses = ({ courses = [] }) => {
  if (!Array.isArray(courses) || courses.length === 0) return null;

  return (
    <div className="container">
      <div className="section-title mb--30">
        <span className="subtitle bg-primary-opacity">
          More Similar Courses
        </span>
        <h4 className="title">Related Courses</h4>
      </div>

      <div className="row g-5">
        {courses.map((course) => {
          const thumbnail =
            course.courseImg?.url ||
            course.courseListImg ||
            "/images/course/course-online-01.jpg";

          return (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12"
              key={course.courseId}
            >
              <div className="rbt-card variation-01 rbt-hover">
                <div className="rbt-card-img">
                  <Link href={`/course-details/${Number(course.courseId)}`}>
                    <Image
                      src={thumbnail}
                      width={355}
                      height={244}
                      alt={course.courseTitle || "Course Thumbnail"}
                    />
                  </Link>
                </div>

                <div className="rbt-card-body">
                  <h4 className="rbt-card-title">
                    <Link href={`/course-details/${course.courseId}`}>
                      {course.courseTitle}
                    </Link>
                  </h4>

                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book"></i>
                      {course.lectures} Lessons
                    </li>
                  </ul>

                  <p className="rbt-card-text">
                    {course.description?.slice(0, 80)}...
                  </p>

                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">
                        ₹{course.offerPrice}
                      </span>
                      <span className="off-price">
                        ₹{course.coursePrice}
                      </span>
                    </div>

                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${course.courseId}`}
                    >
                      Learn More <i className="feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className="row g-5">
        {courses.map((course) => (
          <div
            className="col-lg-4 col-md-6 col-sm-6 col-12"
            key={course.courseId}
          >
            <div className="rbt-card variation-01 rbt-hover">
              <div className="rbt-card-img">
                <Link href={`/course-details/${course.courseId}`}>
                  <Image
                    src={course.courseImg}
                    width={355}
                    height={244}
                    alt={course.title}
                  />
                </Link>
              </div>

              <div className="rbt-card-body">

                <h4 className="rbt-card-title">
                  <Link href={`/course-details/${course.courseId}`}>
                    {course.title}
                  </Link>
                </h4>

                <ul className="rbt-meta">
                  <li>
                    <i className="feather-book"></i>
                    {course.lectures} Lessons
                  </li>
                </ul>

                <p className="rbt-card-text">
                  {course.description?.slice(0, 80)}...
                </p>

                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    <span className="current-price">
                      ₹{course.offerPrice}
                    </span>
                    <span className="off-price">
                      ₹{course.coursePrice}
                    </span>
                  </div>

                  <Link
                    className="rbt-btn-link"
                    href={`/course-details/${course.courseId}`}
                  >
                    Learn More <i className="feather-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default SimilarCourses;
