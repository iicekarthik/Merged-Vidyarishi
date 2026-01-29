import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageHead from "@/pages/Head";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import CategoryHead from "@/components/Category/CategoryHead";
import Separator from "@/components/Common/Separator";
import LmsCourseFilterToggle from "@/components/Vidyarishi-Courses/LmsCourseFilterToggle";

// import CourseDetails from "../../../data/course-details/courseData.json";
import BackToTop from "@/pages/backToTop";
import api from "@/vidyarishiapi/lib/axios";
import FooterThree from "@/components/Footer/Footer-Three";

const Page = () => {
  const router = useRouter();
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

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

        setFilteredCourses(mapped);
      } catch (err) {
        console.error("Course API error:", err?.response?.data || err);
      }

    };

    loadCourses();
  }, [router.isReady]);


  return (
    <>
      <PageHead
        title="Filter Courses | Vidyarishi Course Catalog"
        description="Filter and compare Vidyarishi courses by category, price, and learning level."
      />

      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHead category={filteredCourses[0]} />

          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">

                <LmsCourseFilterToggle course={filteredCourses} />
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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\d+/g, "") // Remove all numeric digits
    .replace("&", "")
    .replace(/\s+/g, " ") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export default Page;
