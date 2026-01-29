import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAppContext } from "@/context/Context";

import Pagination from "@/components/Common/Pagination";
import Separator from "@/components/Common/Separator";
import { useRouter } from "next/navigation";
import Loader from "@/components/Common/Loader";

const CourseFilterOneToggle = ({ Loading, course }) => {
  const { toggle, setIsOpen, setIsOpenSelectedCourse } = useAppContext();
  const router = useRouter();

  if (Loading) return <Loader />;

  if (!course || course.length === 0)
    return (
      <div>
        <h3 className="text-center mt-5">No Courses Found</h3>
        <p className="text-center mt-2">
          Please check the filters or try again later.
        </p>
      </div>
    );

  return (
    <div
      className={`rbt-course-grid-column ${!toggle ? "active-list-view" : ""}`}
    >
      {course.map((specItem, index) => {
        const data = specItem.courseData;
        return (
          <div className="course-grid-3" key={index}>
            <div
              className={`rbt-card variation-01 rbt-hover ${!toggle ? "card-list-2" : ""
                }`}
            >
              <div className="rbt-card-img">
                <Link
                  href={`/${data.universityDetails?.link}/${data.course_link}`}
                >
                  <Image
                    src={data.universityDetails?.buildingImage}
                    width={355}
                    height={244}
                    alt="Card image"
                  />
                  <div className="rbt-badge-3 bg-white">
                    <span>{data.course_type}</span>
                  </div>
                </Link>
              </div>

              <div className="rbt-card-body">
                <h6 className="rbt-card-title">
                  <Link href={`/${data.universityDetails?.link}`}>
                    {data.universityDetails?.title || "Untitled University"}
                  </Link>
                </h6>

                <h6
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "16px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Link
                    href={`/${data.universityDetails?.link}/${data.course_link}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {data.shortName}{specItem.specialization_name ? (" - " + specItem.specialization_name) : ""}
                  </Link>
                </h6>

                <h6
                  style={{
                    margin: "6px 0 6px 0",
                    fontSize: "14px",
                    color: "black",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  ({data.course_name})
                </h6>

                <div
                  style={{ borderTop: "1px solid #ddd", margin: "8px 0" }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    marginTop: "16px",
                  }}
                >
                  <span>Course Fee:</span>
                  <span>{data.semesterFeeRange || data.annualFeeRange}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "16px",
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <span>Location:</span>
                  <span style={{
                    display: "inline-block",
                    width: "170px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }} >{data.universityDetails?.location || "N/A"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "4px",
                    flexWrap: "wrap",
                    fontSize: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <span>Approvals:</span>
                  <span>
                    {data.universityDetails?.accredation
                      ?.slice(0, 3)
                      ?.map((item, idx, arr) => (
                        <span key={idx}>
                          {item?.shortName}
                          {idx < arr.length - 1 ? " | " : ""}
                        </span>
                      ))}
                    {data.universityDetails?.accredation?.length > 3 && (
                      <span> More...</span>
                    )}
                  </span>
                </div>

                <div className="rbt-card-bottom px-40 gap-4 mt-3">
                  <button
                    className="rbt-btn8"
                    onClick={() =>
                      router.push(
                        `${data.universityDetails?.link}/${data.course_link}`
                      )
                    }
                  >
                    Know More
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setIsOpenSelectedCourse(data);
                    }}
                    className="rbt-btn8"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseFilterOneToggle;
