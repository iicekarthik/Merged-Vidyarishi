import { useEffect, useState } from "react";
import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import CategoryHead from "@/components/Category/CategoryHead";
import Pagination from "@/components/Common/Pagination";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import BackToTop from "../backToTop";
import VidyarishiCourseFilterCard from "@/components/Vidyarishi-Courses/VidyarishiCourseFilterCard";
import api from "@/vidyarishiapi/lib/axios";
import FooterThree from "@/components/Footer/Footer-Three";


  const VidyarishiFileTwoLayout = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [wishlistIds, setWishlistIds] = useState([]);

  const ITEMS_PER_PAGE = 6;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchWishlistIds = async () => {
      try {
        const res = await api.get("/api/dashboard/wishlist");
        const ids = res.data?.data?.map((c) => c.courseId) || [];
        setWishlistIds(ids);
      } catch {
        setWishlistIds([]); // not logged in or error
      }
    };

    fetchWishlistIds();
  }, []);


  useEffect(() => {
  const loadCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses/get-public");
      const data = await res.json();

      if (!data.success) return;

      const mappedCourses = data.courses.map((c) => ({
        ...c,
        courseId: c.courseId,
        courseTitle: c.title,
        price: c.offerPrice,
        offPrice: c.coursePrice,
        lesson: c.lectures,
        student: c.enrolledStudent,
        desc: c.description,
        isWishlisted: wishlistIds.includes(c.courseId),
      }));

      setCourses(mappedCourses);
    } catch (err) {
      console.error("Failed to load published courses", err);
    }
  };

  loadCourses();
}, [wishlistIds]);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHead title="Vidyarishi Courses" />

      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead category={courses} />

          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">
                <VidyarishiCourseFilterCard course={paginatedCourses} />

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
              </div>
            </div>
          </div>

          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default VidyarishiFileTwoLayout;



// useEffect(() => {
//   const fetchPublishedCourses = async () => {
//     try {
//       const res = await fetch("/api/admin/courses/get-public");
//       const data = await res.json(); // ✅ FIX 1

//       if (!data.success) return;

//       // ✅ FIX 2: Map DB → UI format ONCE
//       const mappedCourses = data.courses.map((c) => ({
//         ...c,
//         courseTitle: c.title,
//         price: c.offerPrice,
//         offPrice: c.coursePrice,
//         lesson: c.lectures,
//         student: c.enrolledStudent,
//         desc: c.description,
//       }));

//       setCourses(mappedCourses);
//     } catch (err) {
//       console.error("Failed to load published courses", err);
//     }
//   };

//   fetchPublishedCourses();
// }, []);

// ✅ JSON DATA
// import CourseDetails from "@/data/course-details/popularCourses.json";



  // useEffect(() => {
  //   const loadCourses = async () => {
  //     try {
  //       /* ---------------- JSON COURSES ---------------- */
  //       const jsonCourses = CourseDetails.courseDetails.map((c, index) => ({
  //         ...c,
  //         courseId: c.courseId,// 
  //         courseTitle: c.courseTitle,
  //         price: c.price,
  //         offPrice: c.offPrice,
  //         lesson: c.lesson,
  //         student: c.student,
  //         desc: c.desc,
  //         isWishlisted: wishlistIds.includes(c.courseId),
  //         isJson: true,
  //       }));

  //       /* ---------------- API COURSES ---------------- */
  //       const res = await fetch("/api/admin/courses/get-public");
  //       const data = await res.json();

  //       const apiCourses = data.success
  //         ? data.courses
  //           .filter(c => c.isPublished === true) // 🛡️ safety
  //           .map((c) => ({
  //             ...c,
  //             courseTitle: c.title,
  //             price: c.offerPrice,
  //             offPrice: c.coursePrice,
  //             lesson: c.lectures,
  //             student: c.enrolledStudent,
  //             desc: c.description, isWishlisted: wishlistIds.includes(c.courseId),
  //             isJson: false,
  //           }))
  //         : [];

  //       /* ---------------- MERGE ---------------- */
  //       setCourses([...apiCourses, ...jsonCourses]);
  //     } catch (err) {
  //       console.error("Failed to load courses", err);
  //     }
  //   };

  //   loadCourses();
  // }, [wishlistIds]);