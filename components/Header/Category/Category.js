"use client";
import Link from "next/link";
import SingleCategory from "./CategoryProps/SingleCategory";

import MenuData from "../../../data/MegaMenu";
import CategoryData from "../../../data/elements/category";
import CategoryOne from "../../../public/images/nav/category-1.webp";
import CategoryFour from "../../../public/images/nav/category-4.webp";
import CategoryNine from "../../../public/images/nav/category-9.webp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "../NavProps/PageLayout";
import Image from "next/image";
import { useAppContext } from "@/context/Context";

const Category = () => {
  const { Courses, setCourses, setSearch } = useAppContext();

  return (
    <div className="rbt-category-menu-wrapper rbt-category-update">
      {/* <div className="rbt-category-btn">
        <div className="rbt-offcanvas-trigger md-size icon">
          <span className="d-none d-xl-block">
            <i className="feather-grid"></i>
          </span>
          <i title="Courses" className="feather-grid d-block d-xl-none"></i>
        </div>
        <span className="category-text d-none d-xl-block">Courses</span>
        <div  className="rbt-offcanvas-trigger md-size icon">
        </div>
        <i title="Courses" className="  feather-grid d-block d-xl-none"></i>
        <span
          className="access-icon"
          style={{ marginLeft: "15px", marginRight: "5px", marginTop: "2.5px" }}
        ></span>
      </div> */}
      <button
      style={{border : "none"}}
        className={`rbt-category-btn search-trigger-active 
               ${Courses ? "" : "open"}
               `}
        onClick={() => {
          setCourses(!Courses);
          setSearch(true);
        }}
      >
        {/* <span className="d-none d-xl-block"> */}
        <i className="feather-grid"></i>
        <span className="category-text d-none d-xl-block">Courses</span>
        {/* </span> */}
      </button>

      {/* <div className="update-category-dropdown">
        <div className="inner">
          <ul className="dropdown-parent-wrapper">
            <SingleCategory
              image={CategoryNine}
              title="Online Courses"
              isActive={false}
              CategoryData={CategoryData}
              CategoryNum={CategoryData.categoryItemOne}
            />
            <SingleCategory
              image={CategoryOne}
              title="Distance Courses"
              isActive={false}
              CategoryData={CategoryData}
              CategoryNum={CategoryData.categoryItemTwo}
            />
            <SingleCategory
              image={CategoryNine}
              title="Bachelors Courses"
              isActive={false}
              CategoryData={CategoryData}
              CategoryNum={CategoryData.categoryItemOne}
            />
            <SingleCategory
              image={CategoryOne}
              title="Master Courses"
              isActive={false}
              CategoryData={CategoryData}
              CategoryNum={CategoryData.categoryItemTwo}
            />
            <SingleCategory
              image={CategoryNine}
              title="Certificate Courses"
              isActive={false}
              CategoryData={CategoryData}
              CategoryNum={CategoryData.categoryItemTwo}
            />
          </ul>
        </div>
      </div> */}
    </div>
  );
};
export default Category;
