import { useEffect, useState } from "react";

import PageHead from "../Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import CategoryHead from "@/components/Category/CategoryHead";
import LmsCourseFilterToggle from "@/components/Vidyarishi-Courses/LmsCourseFilterToggle";
import Pagination from "@/components/Common/Pagination";
import Separator from "@/components/Common/Separator";

// import CourseDetails from "../../data/course-details/courseData.json";
import BackToTop from "../backToTop";
import api from "@/vidyarishiapi/lib/axios";
import FooterThree from "@/components/Footer/Footer-Three";

const CourseFileTwoLayout = () => {
  const [courses, setCourse] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  // let getAllCourse = JSON.parse(
  //   JSON.stringify(CourseDetails.courseDetails.slice(0, 12))
  // );

  // const startIndex = (page - 1) * 6;

  // const getSelectedCourse = courses.slice(startIndex, startIndex + 6);

  // const handleClick = (num) => {
  //   setPage(num);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };


  // useEffect(() => {
  //   setCourse(getAllCourse);
  //   setTotalPages(Math.ceil(getAllCourse.length / 6));
  // }, [setTotalPages, setCourse]);


  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await api.get("/api/admin/courses/get-public");
        console.log("API RESPONSE:", res.data);

        const mapped = res.data.courses.map((c) => ({
          ...c,
          courseId: c.courseId,
          courseTitle: c.title,
          desc: c.description,
          courseImg: c.courseImg,
          price: c.offerPrice,
          offPrice: c.coursePrice,
          lesson: c.lectures,
          student: c.enrolledStudent,
        }));

        setCourse(mapped);
      } catch (err) {
        console.error("Course API error:", err?.response?.data || err);
      }
    };

    loadCourses();
  }, []);


  return (
    <>
      <PageHead
        title="Browse Courses | Vidyarishi Online Learning Platform"
        description="Explore and filter online courses on Vidyarishi. Find the best courses by category, price, and popularity."
      />

      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead category={courses} />
          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">
                <LmsCourseFilterToggle course={courses} />

                {/* {courses.length > 6 ? (
                  <div className="row">
                    <div className="col-lg-12 mt--60">
                      <Pagination
                        totalPages={totalPages}
                        pageNumber={page}
                        handleClick={handleClick}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
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

export default CourseFileTwoLayout;
