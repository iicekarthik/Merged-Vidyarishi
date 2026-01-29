import React, { useState } from "react";
import { useRouter } from "next/router";

import CategoryBanner from "./Category-Banner";

import CourseFilterTwo from "./Filter/CourseFilterTwo";
import { useAppContext } from "@/context/Context";

const CategoryHeadTwo = ({
  QueryData,
  searchQuery,
  handleSearch,
  category,
  filters,
  onFilterChange,
  universities,
  setisQueryLoaded,
}) => {
  const router = useRouter();
  const path = router.pathname;
  const { toggle, setToggle } = useAppContext();
  const [filterToggle, setFilterToggle] = useState(true);

  // console.log("category", category);

  const [AllUniversities, setAllUniversities] = useState([]);
  const [AllCourses, setAllCourses] = useState([]);
  const [AllSpecializations, setAllSpecializations] = useState([]);
  const [AllMode, setAllMode] = useState([]);
  const [AllLevel, setAllLevel] = useState([]);

  return (
    <>
      <div className="rbt-page-banner-wrapper pb-5 pt-0">
        <div className="rbt-banner-image"></div>

        <div className="rbt-banner-content">
          {/* {category ? (
            <CategoryBanner category={category} />
          ) : (
            // <CategoryBanner /> 
            null
          )} */}

          <div className="rbt-course-top-wrapper mt--5 mt_sm--20">
            <div className="container">
              {path === "/all-courses" || router.query.courseId ? (
                <CourseFilterTwo
                  QueryData={QueryData}
                  filters={filters}
                  onFilterChange={onFilterChange}
                  universities={universities}
                />
              ) : (
                <div
                  className={`row default-exp-wrapper ${
                    filterToggle ? "default-exp-expand" : ""
                  } top-border-less`}
                >
                  <CourseFilterTwo />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryHeadTwo;
