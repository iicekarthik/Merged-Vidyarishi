import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import api from "@/vidyarishiapi/lib/axios";
import { useAppContext } from "@/context/Context";
import { addToCartAction, fetchUserCart } from "@/redux/action/CartAction";

const Viedo = ({ checkMatchCourses }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.CartReducer);
  const { user, cartToggle, setCart, setIsOpenLoginModal } = useAppContext();

  if (!checkMatchCourses) return null;

  const isInCart = cart.some(
    (item) => item.id === Number(checkMatchCourses.courseId)
  );

  const redirectToLoginWithAction = (action, payload, redirectTo) => {
    localStorage.setItem(
      "postLoginAction",
      JSON.stringify({ action, payload, redirectTo })
    );
    setIsOpenLoginModal(true);
  };

  /* ================= ADD TO CART ================= */
  useEffect(() => {
    if (user && !user?.isAdmin && user?.role !== "admin") {
      dispatch(fetchUserCart());
    }
  }, [dispatch, user]);

  const handleAddToCart = async (e) => {
    e?.preventDefault();

    if (!user) {
      redirectToLoginWithAction(
        "add_to_cart",
        { courseId: checkMatchCourses.courseId },
        "/view-cart"
      );
      return;
    }

    if (user?.isAdmin || user?.role === "admin") {
      toast.error("Admins cannot add courses to cart");
      return;
    }

    if (isInCart) {
      toast.info("Course already in cart");
      return;
    }

    try {
      await api.post("/api/dashboard/view_cart", {
        courseId: checkMatchCourses.courseId,
      });

      dispatch(
        addToCartAction(
          checkMatchCourses.courseId,
          1,
          {
            ...checkMatchCourses,

            // 🔥 NORMALIZE PRICE FIELDS
            price:
              checkMatchCourses.offerPrice ??
              checkMatchCourses.coursePrice,

            offPrice: checkMatchCourses.coursePrice,
          }
        )
      );

      setCart(!cartToggle);
      toast.success("Added to cart");
    } catch (error) {
      if (error.response?.status === 401) {
        redirectToLoginWithAction(
          "add_to_cart",
          { courseId: checkMatchCourses.courseId },
          "/view-cart"
        );
      } else {
        toast.error("Failed to add to cart");
      }
    }
  };

  /* ================= BUY NOW ================= */
  const handleBuyNow = () => {
    if (!user) {
      redirectToLoginWithAction(
        "buy_now",
        { courseId: checkMatchCourses.courseId },
        "/pay-online"
      );
      return;
    }

    router.push({
      pathname: "/pay-online",
      query: {
        courseName: checkMatchCourses.title, // ✅ NOT empty
        courseFee:
          checkMatchCourses.offerPrice || checkMatchCourses.coursePrice,
      },
    });
  };

  return (
    <>
      {checkMatchCourses.courseImg && (
        <Image
          className="w-100 rbt-radius"
          src={checkMatchCourses.courseImg}
          width={355}
          height={255}
          alt="Course Preview"
        />
      )}

      <div className="content-item-content">
        <div className="rbt-price-wrapper">
          <div className="rbt-price">
            <span className="current-price">
              ₹{checkMatchCourses.offerPrice}
            </span>
            <span className="off-price">
              ₹{checkMatchCourses.coursePrice}
            </span>
          </div>
        </div>

        {/* ADD TO CART */}
        <div className="add-to-card-button mt--15">
          <button
            className="rbt-btn btn-gradient w-100"
            disabled={isInCart}
            onClick={handleAddToCart}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>

        {/* BUY NOW */}
        <div className="buy-now-btn mt--15">
          <button
            className="rbt-btn btn-border w-100"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>

        <ul className="rbt-course-details-list-wrapper mt--20">
          <li>
            <span>Lectures:</span> <span>{checkMatchCourses.lectures}</span>
          </li>
          <li>
            <span>Students:</span>{" "}
            <span>{checkMatchCourses.enrolledStudent}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Viedo;


// const Viedo = ({ checkMatchCourses }) => {

//   // inside component
//   const router = useRouter();

//   const { cartToggle, setCart } = useAppContext();
//   const [toggle, setToggle] = useState(false);
//   const [hideOnScroll, setHideOnScroll] = useState(false);

//   // =====> Start ADD-To-Cart
//   const dispatch = useDispatch();
//   const { cart } = useSelector((state) => state.CartReducer);

//   const [amount, setAmount] = useState(1);

//   const addToCartFun = (id, amount, product) => {
//     dispatch(addToCartAction(id, amount, product));
//     setCart(!cartToggle);
//   };

//   useEffect(() => {
//     dispatch({ type: "COUNT_CART_TOTALS" });
//     localStorage.setItem("hiStudy", JSON.stringify(cart));
//   }, [cart]);

//   // =====> For video PopUp
//   useEffect(() => {
//     import("venobox/dist/venobox.min.js").then((venobox) => {
//       new venobox.default({
//         selector: ".popup-video",
//       });
//     });

//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       const isHide = currentScrollPos > 200;

//       setHideOnScroll(isHide);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <Link
//         className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${hideOnScroll ? "d-none" : ""
//           }`}
//         data-vbtype="video"
//         href="https://www.youtube.com/watch?v=nA1Aqp0sPQo"
//       >
//         <div className="video-content">
//           {checkMatchCourses.courseImg && (
//             <Image
//               className="w-100 rbt-radius"
//               src={checkMatchCourses.courseImg}
//               width={355}
//               height={255}
//               alt="Video Images"
//             />
//           )}
//           <div className="position-to-top">
//             <span className="rbt-btn rounded-player-2 with-animation">
//               <span className="play-icon"></span>
//             </span>
//           </div>
//           <span className="play-view-text d-block color-white">
//             <i className="feather-eye"></i> Preview this course
//           </span>
//         </div>
//       </Link>
//       <div className="content-item-content">
//         <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
//           <div className="rbt-price">
//             <span className="current-price">${checkMatchCourses.price}</span>
//             <span className="off-price">${checkMatchCourses.offPrice}</span>
//           </div>
//           <div className="discount-time">
//             <span className="rbt-badge color-danger bg-color-danger-opacity">
//               <i className="feather-clock"></i> {checkMatchCourses.days} days
//               left!
//             </span>
//           </div>
//         </div>

//         <div className="add-to-card-button mt--15">
//           <Link
//             className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
//             href=""
//             onClick={() =>
//               addToCartFun(checkMatchCourses.id, amount, checkMatchCourses)
//             }
//           >
//             <span className="btn-text">Add to Cart</span>
//             <span className="btn-icon">
//               <i className="feather-arrow-right"></i>
//             </span>
//           </Link>
//         </div>

//         <div className="buy-now-btn mt--15">
//           <button
//             className="rbt-btn btn-border icon-hover w-100 d-block text-center"
//             onClick={() =>
//               router.push({
//                 pathname: "/pay-online",
//                 query: {
//                   courseName: checkMatchCourses.courseTitle,
//                   courseFee: checkMatchCourses.price,
//                 },
//               })
//             }
//           >
//             <span className="btn-text">Buy Now</span>
//             <span className="btn-icon">
//               <i className="feather-arrow-right"></i>
//             </span>
//           </button>
//         </div>


//         <span className="subtitle">
//           <i className="feather-rotate-ccw"></i> 30-Day Money-Back Guarantee
//         </span>
//         <div
//           className={`rbt-widget-details has-show-more ${toggle ? "active" : ""
//             }`}
//         >
//           <ul className="has-show-more-inner-content rbt-course-details-list-wrapper">
//             {checkMatchCourses &&
//               checkMatchCourses.roadmap.map((item, innerIndex) => (
//                 <li key={innerIndex}>
//                   <span>{item.text}</span>
//                   <span className="rbt-feature-value rbt-badge-5">
//                     {item.desc}
//                   </span>
//                 </li>
//               ))}
//           </ul>
//           <div
//             className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
//             onClick={() => setToggle(!toggle)}
//           >
//             Show More
//           </div>
//         </div>

//         <div className="social-share-wrapper mt--30 text-center">
//           <div className="rbt-post-share d-flex align-items-center justify-content-center">
//             <ul className="social-icon social-default transparent-with-border justify-content-center">
//               <li>
//                 <Link href="https://www.facebook.com/vidyarishiindia/">
//                   <i className="feather-facebook"></i>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="https://x.com/vidyarishiindia/">
//                   <i className="fab fa-twitter"></i>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="https://in.linkedin.com/company/vidyarishi/">
//                   <i className="fab fa-linkedin-in"></i>
//                 </Link>
//               </li>
//               <li>
//                 <Link href="https://www.instagram.com/vidyarishi_india/">
//                   <i className="fab fa-instagram"></i>
//                 </Link>

//               </li>
//             </ul>
//           </div>
//           <hr className="mt--20" />
//           <div className="contact-with-us text-center">
//             <p>For details about the course</p>
//             <p className="rbt-badge-2 mt--10 justify-content-center w-100">
//               <i className="feather-phone mr--5"></i> Call Us:{" "}
//               <Link href="">
//                 <strong>+444 555 666 777</strong>
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

