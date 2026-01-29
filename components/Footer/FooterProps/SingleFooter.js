import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const SingleFooter = ({
  classOne,
  title,
  footerType,
  footerType2,
  isUniversity = false,
}) => {
  return (
    <div className={classOne}>
      <div
        className="footer-widget"
        style={{
          marginTop: "15px",
        }}
      >
        {/* <div
          style={{
            marginTop: "10px",
            width: "100%",
            height: "0.5px",
            backgroundColor: "#FFFFFFAB",
            marginBottom: "10px",
          }}
        ></div> */}
        <h5 className="ft-title">{title}</h5>
        <div
          style={{
            marginTop: "-10px",
            width: "100%",
            height: "0.5px",
            backgroundColor: "#FFFFFFAB",
            marginBottom: "10px",
          }}
        ></div>
        <ul className="ft-link">
          {isUniversity && (
            <>
              {["Online", "Distance", "F-Tell"].map((mode) => {
                const filteredItems = footerType
                  ?.filter((item) => item.mode === mode)
                  .slice(0, 5);

                return filteredItems?.map((value, innerIndex) => (
                  <li key={innerIndex}>
                    <Link href={value.link ? `/${value.link}` : ""}>
                      {value.title}
                    </Link>
                  </li>
                ));
              })}
              <li>
                <Link style={{ marginBottom: "10px" }} href={`our-partners`}>
                  More Universities &nbsp; <FaArrowRightLong />
                </Link>
              </li>
            </>
          )}

          {/* {!isUniversity &&
            footerType?.map((value, innerIndex) => (
              <li key={innerIndex}>
                <Link
                  href={`${
                    value.course_link ? `course/${value.course_link}` : ""
                  }`}
                >
                  {value.course_name}
                </Link>
              </li>
            ))} */}

          {!isUniversity &&
            footerType?.map((value, innerIndex) => (
              <li key={innerIndex}>
                <Link
                  href={
                    value.course_link
                      ? `course/${value.course_link}`          // JSON courses
                      : `/course-details/${value.courseId}`    // DB courses
                  }
                >
                  {value.course_name || value.title}
                </Link>
              </li>
            ))}

          {!isUniversity &&
            footerType2?.map((value, innerIndex) => (
              <div key={innerIndex}>
                {/* ✅ Online Courses */}
                {value?.course_type === "Online" && (
                  <>
                    {value?.specializations?.specializationList
                      ?.slice(0, 6)
                      ?.map((list, index) => (
                        <li key={index}>
                          <Link
                            href={
                              value.course_link
                                ? `course/${value.course_link}`
                                : ""
                            }
                          >
                            {value?.course_type} {list?.title}
                          </Link>
                        </li>
                      ))}
                    <li>
                      <Link
                        style={{ marginBottom: "10px" }}
                        href={
                          value.course_link ? `course/${value.course_link}` : ""
                        }
                      >
                        More {value?.course_type} Courses &nbsp;{" "}
                        <FaArrowRightLong />
                      </Link>
                    </li>
                  </>
                )}

                {/* ✅ Distance Courses */}
                {value?.course_type === "Distance" && (
                  <>
                    {value?.specializations?.specializationList
                      ?.slice(0, 6)
                      ?.map((list, index) => (
                        <li key={index}>
                          <Link
                            href={
                              value.course_link
                                ? `course/${value.course_link}`
                                : ""
                            }
                          >
                            {value?.course_type} {list?.title}
                          </Link>
                        </li>
                      ))}
                    <li>
                      <Link
                        style={{ marginBottom: "10px" }}
                        href={
                          value.course_link ? `course/${value.course_link}` : ""
                        }
                      >
                        More {value?.course_type} Courses &nbsp;{" "}
                        <FaArrowRightLong />
                      </Link>
                    </li>
                  </>
                )}
              </div>
            ))}

        </ul>
      </div>
    </div>
  );
};

export default SingleFooter;
