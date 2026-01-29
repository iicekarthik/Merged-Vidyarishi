import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/vidyarishiapi/lib/axios";
import { toast } from "react-toastify";

const CourseWidget = ({
  data,
  courseStyle,
  showDescription,
  showAuthor,
  isProgress,
  isCompleted,
  isEdit,
  onRemove,
}) => {
  const [discountPercentage, setDiscountPercentage] = useState("");
  // const [totalReviews, setTotalReviews] = useState(0);
  // const [rating, setRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState();

  const [wishlistLoading, setWishlistLoading] = useState(false);

  const courseId = data.courseId;

  // ✅ Progress state (synced with backend)
  const [progressValue, setProgressValue] = useState(
    data.progress ?? data.progressValue ?? 0
  );

  useEffect(() => {
    setProgressValue(data.progress ?? data.progressValue ?? 0);
  }, [data.progress, data.progressValue]);

  // ✅ Discount 
  useEffect(() => {
    if (data.offerPrice && data.coursePrice) {
      const percentage =
        ((data.coursePrice - data.offerPrice) / data.coursePrice) * 100;
      setDiscountPercentage(percentage.toFixed(0));
    }

    // if (data.reviews) {
    //   const r = data.reviews;
    //   setTotalReviews(
    //     (r.oneStar || 0) +
    //     (r.twoStar || 0) +
    //     (r.threeStar || 0) +
    //     (r.fourStar || 0) +
    //     (r.fiveStar || 0)
    //   );
    // }

    // if (data.rating?.average) {
    //   setRating(Math.round(data.rating.average));
    // }
  }, [data]);

  // ✅ Wishlist sync
  useEffect(() => {
    setIsWishlisted(!!(data.isWishlisted || data.fromWishlist));
  }, [data]);

  /* ---------------- WISHLIST TOGGLE ---------------- */
  const toggleWishlist = async () => {
    if (wishlistLoading) return;
    setWishlistLoading(true);

    try {
      if (isWishlisted) {
        // REMOVE
        const res = await api.delete("/api/dashboard/wishlist", {
          data: { courseId },
        });

        setIsWishlisted(false);
        onRemove?.(courseId);

        // ✅ ONLY message you want
        toast.info("Removed from wishlist");
      } else {
        // ADD (NO toast)
        await api.post("/api/dashboard/wishlist", {
          courseId,
          courseTitle: data.title || data.courseTitle,
        });

        // ✅ Bookmark stays filled
        setIsWishlisted(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Wishlist action failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  const isCourseCompleted =
    data.isCompleted === true || data.quizPassed === true || progressValue === 100;
  const isQuizOnlyCourse = data.contentType === "quizOnly";

  const thumbnail =
    data.courseImg?.url ||
    data.courseListImg ||
    "/images/course/course-online-01.jpg";


  return (
    <div className="rbt-card variation-01 rbt-hover">
      {/* IMAGE */}
      <div className="rbt-card-img">
        <Link href={`/course-details/${courseId}`}>
          <Image
            width={330}
            height={227}
            src={thumbnail}
            alt={data.title}
            style={{ objectFit: "contain" }}
          />

          {discountPercentage && (
            <div className="rbt-badge-3 bg-white">
              <span>-{discountPercentage}%</span>
              <span>Off</span>
            </div>
          )}
        </Link>
      </div>

      <div className="rbt-card-body">
        {courseStyle === "two" && (
          <>
            <div className="rbt-card-top">
              {/* <div className="rbt-review">
                <div className="rating">
                  {Array.from({ length: rating }, (_, i) => (
                    <i className="fas fa-star" key={i} />
                  ))}
                </div>
                <span className="rating-count">
                  ({totalReviews} Reviews)
                </span>
              </div> */}

              <div className="rbt-bookmark-btn">
                <button
                  className="rbt-round-btn"
                  onClick={toggleWishlist}
                  disabled={wishlistLoading}
                >

                  <i
                    className={
                      isWishlisted
                        ? "fas fa-bookmark"
                        : "feather-bookmark"
                    }
                  />
                </button>
              </div>
            </div>

            <h4 className="rbt-card-title"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: "1.4em",
                maxHeight: "2.8em",
              }}>
              <Link href={`/course-details/${courseId}`}>
                {data.title}
              </Link>
            </h4>
          </>
        )}

        <ul className="rbt-meta">
          <li>
            <i className="feather-book" /> {data.lectures || 0} Lessons
          </li>
          {/* <li>
            <i className="feather-users" /> {data.enrolledStudent || 0} Students
          </li> */}
        </ul>

        {/* ================= LMS PROGRESS ================= */}

        {isProgress ? (
          <>
            {/* <div className="rbt-progress-style-1 mb--20 mt--10">
              <div className="progress">
                <div
                  className="progress-bar bar-color-success"
                  style={{ width: `${progressValue}%` }}
                />
                <span>{progressValue}%</span>
              </div>
            </div> */}

            {!isQuizOnlyCourse && (
              <div className="rbt-progress-style-1 mb--20 mt--10">
                <div className="progress">
                  <div
                    className="progress-bar bar-color-success"
                    style={{ width: `${progressValue}%` }}
                  />
                  <span>{progressValue}%</span>
                </div>
              </div>
            )}


            {/* ✅ Completion Date */}
            {data.completedAt && (
              <p className="text-muted small mb--10">
                Completed on{" "}
                {new Date(data.completedAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}

              </p>
            )}

            <div className="rbt-card-bottom">
              {/* {progressValue === 100 ? (
                <a
                  className="rbt-btn btn-sm bg-primary-opacity w-100"
                  href={`/api/dashboard/student/lms/certificate/generate?courseId=${courseId}`}
                >
                  Download Certificate
                </a>
              ) : (
                <Link
                  href={`/course-player/${courseId}`}
                  className="rbt-btn btn-sm bg-primary-opacity w-100"
                >
                  Continue Learning
                </Link>
              )} */}
              {isCourseCompleted ? (
                <a
                  className="rbt-btn btn-sm bg-primary-opacity w-100"
                  href={`/api/dashboard/student/lms/certificate/generate?courseId=${courseId}`}
                >
                  Download Certificate
                </a>
              ) : (
                <Link
                  href={
                    isQuizOnlyCourse
                      ? `/course-player/${courseId}/quiz`
                      : `/course-player/${courseId}`
                  }
                  className="rbt-btn btn-sm bg-primary-opacity w-100"
                >
                  Continue Learning
                </Link>

              )}

            </div>
          </>
        ) : (
          <div className="rbt-card-bottom">
            <div className="rbt-price">
              <span className="current-price">${data.offerPrice}</span>
              <span className="off-price">${data.coursePrice}</span>
            </div>

            <Link
              className="rbt-btn-link"
              href={`/course-details/${courseId}`}
            >
              Learn More <i className="feather-arrow-right" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseWidget;
