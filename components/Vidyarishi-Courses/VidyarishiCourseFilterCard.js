import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/vidyarishiapi/lib/axios";
import { useAppContext } from "@/context/Context";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, fetchUserCart } from "@/redux/action/CartAction";
import Pagination from "@/components/Common/Pagination";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const VidyarishiCourseFilterCard = ({ course, start, end }) => {
  const router = useRouter();
  const { toggle, cartToggle, setCart, user, setIsOpenLoginModal } = useAppContext();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const ITEMS_PER_PAGE = 6;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  const [amount] = useState(1);

  const addToCartFun = (id, amount, product) => {
    dispatch(addToCartAction(id, amount, product));
    setCart(!cartToggle);
  };

  const isInCart = (courseId) => {
    return cart.some((item) => item.id === Number(courseId));
  };

  useEffect(() => {
    if (!user?.isAdmin && user?.role !== "admin") {
      dispatch(fetchUserCart());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (Array.isArray(course)) {
      setCourses(course);
      setPage(1);
    }
  }, [course]);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const redirectToLoginWithAction = (action, payload, redirectTo) => {
    localStorage.setItem(
      "postLoginAction",
      JSON.stringify({ action, payload, redirectTo })
    );

    setIsOpenLoginModal(true);
  };

  const toggleWishlist = async (courseData) => {
    if (!user) {
      redirectToLoginWithAction(
        "wishlist",
        {
          courseId: courseData.courseId,
          courseTitle: courseData.courseTitle,
        },
        "/dashboard/wishlist"
      );
      return;
    }


    if (wishlistLoading) return;
    setWishlistLoading(true);

    if (user?.isAdmin || user?.role === "admin") return;

    const courseId = courseData.courseId;

    try {
      if (courseData.isWishlisted) {
        await api.delete("/api/dashboard/wishlist", {
          data: { courseId },
        });

        setCourses((prev) =>
          prev.map((c) =>
            c.courseId === courseId ? { ...c, isWishlisted: false } : c
          )
        );

        toast.info("Removed from wishlist");
      } else {
        await api.post("/api/dashboard/wishlist", {
          courseId,
          courseTitle: courseData.courseTitle,
        });

        setCourses((prev) =>
          prev.map((c) =>
            c.courseId === courseId ? { ...c, isWishlisted: true } : c
          )
        );
      }
    } catch {
      toast.error("Wishlist action failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  useEffect(() => {
    if (!user) return;

    const fetchEnrolledCourses = async () => {
      try {
        const res = await api.get("/api/dashboard/student/enrolled-courses");
        setEnrolledCourseIds(
          res.data.map((c) => Number(c.courseId))
        );
      } catch {
        console.error("Failed to fetch enrolled courses");
      }
    };

    fetchEnrolledCourses();
  }, [user]);
  const isEnrolled = (courseId) =>
    enrolledCourseIds.includes(Number(courseId));

  return (
    <>
      <div
        className={`rbt-course-grid-column ${!toggle ? "active-list-view" : ""
          }`}
      >
        {paginatedCourses.map((data) => {

          const thumbnail =
            data.courseImg?.url ||
            data.courseListImg ||
            "/images/course/course-online-01.jpg";

          const discountPercentage =
            data.offPrice && data.price
              ? Math.round(
                ((data.offPrice - data.price) / data.offPrice) * 100
              )
              : null;

          return (
            <div className="course-grid-3" key={data.courseId}>
              <div
                className={`rbt-card variation-01 rbt-hover ${!toggle ? "card-list-2" : ""
                  }`}
              >
                {/* IMAGE */}
                <div className="rbt-card-img">
                  <Link href={`/course-details/${Number(data.courseId)}`}>
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


                <div className="rbt-card-body">
                  <div className="rbt-card-top">

                    {!user?.isAdmin && user?.role !== "admin" && (
                      <div className="rbt-bookmark-btn">
                        <button
                          className="rbt-round-btn"
                          disabled={wishlistLoading}
                          onClick={() => toggleWishlist(data)}
                        >

                          <i
                            className={
                              data.isWishlisted
                                ? "fas fa-bookmark"
                                : "feather-bookmark"
                            }
                          />
                        </button>
                      </div>
                    )}

                  </div>

                  <h4
                    className="rbt-card-title"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.4em",
                      maxHeight: "2.8em",
                    }}
                  >
                    <Link href={`/course-details/${Number(data.courseId)}`}>
                      {data.courseTitle}
                    </Link>
                  </h4>


                  <ul className="rbt-meta">
                    <li>
                      <i className="feather-book"></i>
                      {data.lesson} Lessons
                    </li>
                  </ul>

                  <p
                    className="rbt-card-text"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: "1.5em",
                      maxHeight: "3em",
                    }}
                  >
                    {data.desc}
                  </p>


                  <div className="rbt-card-bottom">
                    <div className="rbt-price">
                      <span className="current-price">₹{data.price}</span>
                      {data.offPrice && (
                        <span className="off-price">₹{data.offPrice}</span>
                      )}
                    </div>

                    <Link
                      className="rbt-btn-link"
                      href={`/course-details/${Number(data.courseId)}`}
                    >
                      Learn More <i className="feather-arrow-right"></i>
                    </Link>
                  </div>

                  <div className="rbt-button-group" style={{ margin: "8px" }}>
                    {!user?.isAdmin &&
                      user?.role !== "admin" &&
                      !isEnrolled(data.courseId) && (
                        <div className="add-to-card-button mt--15 w-100">
                          <Link
                            className={`rbt-btn btn-gradient icon-hover w-100 d-block text-center ${isInCart(data.courseId) ? "disabled" : ""
                              }`}
                            href="/view-cart"
                            onClick={async (e) => {
                              e.preventDefault();
                              if (isInCart(data.courseId)) return;

                              try {
                                await api.post("/api/dashboard/view_cart", {
                                  courseId: data.courseId,
                                });
                                addToCartFun(data.courseId, amount, data);
                              } catch (error) {
                                if (error.response?.status === 401) {
                                  redirectToLoginWithAction(
                                    "add_to_cart",
                                    { courseId: data.courseId },
                                    "/view-cart"
                                  );
                                } else if (error.response?.status === 403) {
                                  alert("Admins cannot add courses to cart");
                                } else {
                                  alert("Failed to add to cart");
                                }
                              }
                            }}
                          >
                            <span className="btn-text">
                              {isInCart(data.courseId) ? "Already in Cart" : "Add to Cart"}
                            </span>
                            <span className="btn-icon">
                              <i className="feather-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      )}

                    {isEnrolled(data.courseId) && (
                      <Link
                        href={`/course-player/${data.courseId}`}
                        className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                      >
                        <i className="feather-play"></i> Go to Course
                      </Link>
                    )}


                  </div>

                </div>
              </div>
            </div>
          );
        })}

      </div>

      {courses.length > ITEMS_PER_PAGE && (
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

export default VidyarishiCourseFilterCard;
