import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";
import Pagination from "@/components/Common/Pagination";
import { useState, useEffect } from "react";

const LmsCourseFilterToggle = ({ course = [] }) => {
  const { toggle } = useAppContext();

  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = course.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(course.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [course]);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!course.length) {
    return (
      <div className="text-center mt-5">
        <h4>No Courses Available</h4>
      </div>
    );
  }

  return (
    <>
      <div
        className={`rbt-course-grid-column ${!toggle ? "active-list-view" : ""
          }`}
      >
        {paginatedCourses.map((data) => {
          const discountPercentage =
            data.offPrice && data.price
              ? Math.round(
                ((data.offPrice - data.price) / data.offPrice) * 100
              )
              : null;

          const thumbnail =
            data.courseImg?.url ||
            data.courseListImg ||
            "/images/course/course-online-01.jpg";

          return (
            <div className="course-grid-3" key={data.courseId}>
              <div
                className={`rbt-card variation-01 rbt-hover ${!toggle ? "card-list-2" : ""
                  }`}
              >
                {/* IMAGE */}
                <div className="rbt-card-img">
                  <Link href={`/course-details/${data.courseId}`}>
                    {/* <Image
                      src={
                        data.courseImg ||
                        "/images/course/course-online-01.jpg"
                      }
                      width={355}
                      height={244}
                      alt={data.courseTitle}
                    /> */}
                    <Image
                      src={thumbnail}
                      width={355}
                      height={244}
                      alt={data.courseTitle}
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
                  <h4 className="rbt-card-title">
                    <Link href={`/course-details/${data.courseId}`}>
                      {data.courseTitle}
                    </Link>
                  </h4>

                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book"></i>
                      {data.lesson} Lessons
                    </li>
                    {/* <li>
                      <i className="feather-users"></i>
                      {data.student} Students
                    </li> */}
                  </ul>

                  <p className="rbt-card-text">{data.desc}</p>

                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">₹{data.price}</span>
                      {data.offPrice && (
                        <span className="off-price">₹{data.offPrice}</span>
                      )}
                    </div>

                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${data.courseId}`}
                    >
                      View Details <i className="feather-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {course.length > ITEMS_PER_PAGE && (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LmsCourseFilterToggle;
