import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

import MenuData from "../../data/MegaMenu";
import CategoryData from "../../data/elements/category.json";

import CourseLayout from "./NavProps/CourseLayout";
import PageLayout from "./NavProps/PageLayout";
import ElementsLayout from "./NavProps/ElementsLayout";

import addImage from "../../public/images/service/mobile-cat.jpg";
import Category from "./Category/Category";
import { useAppContext } from "@/context/Context";
import AllCourses from "@/data/vidya/VidyaCourses";

const Nav = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const router = useRouter();

  const { Courses, setCourses, search, setSearch } = useAppContext();

  const isActive = (href) => router.pathname.startsWith(href);

  const toggleMenuItem = (item) => {
    setActiveMenuItem(activeMenuItem === item ? null : item);
  };

  const [OnlineCourses, setOnlineCourses] = useState(null);
  const [DistanceCourses, setDistanceCourses] = useState(null);
  const [BachelorCourses, setBachelorCourses] = useState(null);
  const [BachelorCoursesTwo, setBachelorCoursesTwo] = useState(null);
  const [AllBachelorCourses, setAllBachelorCourses] = useState(null);
  const [MasterCourses, setMasterCourses] = useState(null);
  const [MasterCoursesTwo, setMasterCoursesTwo] = useState(null);
  const [AllMasterCourses, setAllMasterCourses] = useState(null);
  const [DiplomaCourses, setDiplomaCourses] = useState(null);
  const [CertificationCourses, setCertificationCourses] = useState(null);

  useEffect(() => {
    if (!AllCourses?.all_Courses || !Array.isArray(AllCourses?.all_Courses))
      return;

    const extractCourses = (
      filterFn = () => true,
      modeFilter = null,
      degreeLevelFilter = null,
      CourseNameFilter = null
    ) => {
      const degreeOrder = [
        "Masters",
        "Bachelors",
        "Postgraduate Diploma",
        "Undergraduate Diploma",
        "Certificate",
      ];

      return AllCourses?.all_Courses
        ?.filter((course) => {
          const matchesMode =
            !modeFilter ||
            (Array.isArray(modeFilter)
              ? modeFilter.includes(course.course_type)
              : course.course_type === modeFilter);

          const matchesCourseName =
            !CourseNameFilter ||
            (Array.isArray(CourseNameFilter)
              ? CourseNameFilter.includes(course.shortName)
              : course.shortName === CourseNameFilter);

          const matchesDegreeLevel =
            !degreeLevelFilter || course.degree_type === degreeLevelFilter;

          return (
            matchesMode &&
            matchesDegreeLevel &&
            matchesCourseName &&
            filterFn(course)
          );
        })
        .sort(
          (a, b) =>
            degreeOrder.indexOf(a.degree_type) -
            degreeOrder.indexOf(b.degree_type)
        );
    };

    // 🔹 Online Courses
    setOnlineCourses(extractCourses(() => true, ["Online"], null));

    // 🔹 Distance Courses
    setDistanceCourses(extractCourses(() => true, ["Distance"], null));

    // 🔹 Bachelors Degree Courses
    const bachelorsOnline = extractCourses(
      () => true,
      ["Online", "F-Tell"],
      "Bachelors"
    );
    const bachelorsDistance = extractCourses(
      () => true,
      ["Distance"],
      "Bachelors",
      ["BLIS"]
    );

    setBachelorCourses(bachelorsOnline);
    setBachelorCoursesTwo(bachelorsDistance);
    setAllBachelorCourses([...bachelorsOnline, ...bachelorsDistance]); // ✅ Fix applied

    // 🔹 Masters Degree Courses
    const mastersOnline = extractCourses(
      () => true,
      ["Online", "F-Tell"],
      "Masters"
    );
    const mastersDistance = extractCourses(
      () => true,
      ["Distance"],
      "Masters",
      ["MLIS"]
    );

    setMasterCourses(mastersOnline);
    setMasterCoursesTwo(mastersDistance);
    setAllMasterCourses([...mastersOnline, ...mastersDistance]); // ✅ Fix applied

    // 🔹 Diploma Courses
    setDiplomaCourses(extractCourses(() => true, null, "Diploma"));

    // 🔹 Certification Courses
    setCertificationCourses(extractCourses(() => true, null, "Certification"));
  }, [AllCourses]); // ✅ Dependency array correct hai

  return (
    <nav className="mainmenu-nav">
      <ul className="mainmenu">
        <div>
          {/* <li className="with-megamenu has-menu-child-item position-static">
          <Link
            className={`${activeMenuItem === "home" ? "open" : ""}`}
            onClick={() => toggleMenuItem("home")}
            href="#"
          >
            Home
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu menu-skin-dark ${
              activeMenuItem === "home" ? "active d-block" : ""
            }`}
          >
            <div className="wrapper">
              <div className="row row--15 home-plesentation-wrapper single-dropdown-menu-presentation">
                {MenuData &&
                  MenuData.menuData.map((data, index) => {
                    if (data.menuType === "home") {
                      const elements = data.menuItems?.map(
                        (value, innerIndex) => (
                          <div
                            className="col-lg-12 col-xl-2 col-xxl-2 col-md-12 col-sm-12 col-12 single-mega-item"
                            key={innerIndex}
                          >
                            <div className="demo-single">
                              <div
                                className={`inner ${
                                  value.badget ? "disable" : ""
                                }`}
                              >
                                <div className="thumbnail">
                                  <Link href={value.link} className="relative">
                                    <Image
                                      src={value.img}
                                      width={454}
                                      height={332}
                                      alt="Demo Images"
                                    />
                                    {value.badget ? (
                                      <span className="rbt-badge-card rbt-badge-card__coming">
                                        Coming
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                </div>
                                <div className="content">
                                  <h4 className="title">
                                    <Link href={value.link}>
                                      {value.title}
                                      {value.badget ? (
                                        <span className="rbt-badge-card ms-3 d-lg-none">
                                          Coming
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                      <span className="btn-icon">
                                        <i className="feather-arrow-right"></i>
                                      </span>
                                    </Link>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                      return elements;
                    }
                    return null;
                  })}
              </div>
            </div>
          </div>
        </li>
        <li className="with-megamenu has-menu-child-item">
          <Link
            className={`${activeMenuItem === "courses" ? "open" : ""}`}
            href="#"
            onClick={() => toggleMenuItem("courses")}
          >
            Courses
            <i className="feather-chevron-down"></i>
          </Link>

          <div
            className={`rbt-megamenu grid-item-2 ${
              activeMenuItem === "courses" ? "active d-block" : ""
            }`}
          >
            <div className="wrapper">
              {MenuData &&
                MenuData.menuData.map((data, index) => {
                  if (data.menuType === "grid-item-2") {
                    const elements = data.submenuBanner?.map(
                      (value, innerIndex) => (
                        <div className="row" key={innerIndex}>
                          <div className="col-lg-12">
                            <div className="mega-top-banner">
                              <div className="content">
                                <h4 className="title">{value.title}</h4>
                                <p className="description">
                                  {value.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    );
                    return elements;
                  }
                })}
              <div className="row row--15">
                <CourseLayout
                  courseTitle="Course Layout"
                  MenuData={MenuData}
                  type="grid-item-2"
                  courseType={true}
                  num={7}
                />
                <CourseLayout
                  courseTitle="Course Layout"
                  MenuData={MenuData}
                  type="grid-item-2"
                  courseType={false}
                  num={6}
                />
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <ul className="nav-quick-access">
                    {MenuData &&
                      MenuData.menuData.map((data, index) => {
                        if (data.menuType === "grid-item-2") {
                          const coursElements = data.menuFooterItems?.map(
                            (value, innerIndex) => (
                              <li key={innerIndex}>
                                <Link href={value.link}>
                                  <i className="feather-folder-minus"></i>
                                  {value.title}
                                </Link>
                              </li>
                            )
                          );
                          return coursElements;
                        }
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="has-dropdown has-menu-child-item">
          <Link
            className={`${activeMenuItem === "dashboard" ? "open" : ""}`}
            href="#"
            onClick={() => toggleMenuItem("dashboard")}
          >
            Dashboard
            <i className="feather-chevron-down"></i>
          </Link>
          <ul
            className={`submenu ${
              activeMenuItem === "dashboard" ? "active d-block" : ""
            }`}
          >
            {MenuData &&
              MenuData.menuData.map((data, index) => {
                if (data.menuType === "default-dropdown") {
                  const elements = data.menuItems?.map((value, innerIndex) => (
                    <li className="has-dropdown" key={innerIndex}>
                      <Link href="#">{value.title}</Link>
                      <ul className="submenu">
                        {value.submenuItems?.map(
                          (submenuItem, submenuItemIndex) => (
                            <li key={submenuItemIndex}>
                              <Link href={submenuItem.link}>
                                {submenuItem.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ));
                  return elements;
                }
                return null;
              })}
          </ul>
        </li>
        */}
          {/* <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href="#"
            className={`${activeMenuItem === "pages" ? "open" : ""}`}
            onClick={() => toggleMenuItem("pages")}
          >
            Pages
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu grid-item-4 ${
              activeMenuItem === "pages" ? "active d-block" : ""
            }`}
          >
            <div className="wrapper">
              <div className="row row--15">
                <PageLayout
                  title="Get Started"
                  MenuData={MenuData}
                  menuGrid="grid-item-4"
                  gridNumber="1"
                />
                <PageLayout
                  title="Get Started"
                  MenuData={MenuData}
                  menuGrid="grid-item-4"
                  gridNumber="2"
                />
                <PageLayout
                  title="Shop Pages"
                  MenuData={MenuData}
                  menuGrid="grid-item-4"
                  gridNumber="3"
                />
                <div className="col-lg-12 col-xl-3 col-xxl-3 single-mega-item">
                  <div className="mega-category-item">
                    {MenuData &&
                      MenuData.menuData.map((data, index) => {
                        if (data.menuType === "grid-item-4") {
                          const elements = data.gridMenuItems4?.map(
                            (value, innerIndex) => (
                              <div
                                className="nav-category-item"
                                key={innerIndex}
                              >
                                <div className="thumbnail">
                                  <div className="image">
                                    {value.image ? (
                                      <Image
                                        src={value.image}
                                        width={454}
                                        height={332}
                                        alt={value.title}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <Link href={value.link}>
                                    <span>{value.title}</span>
                                    <i className="feather-chevron-right"></i>
                                  </Link>
                                </div>
                              </div>
                            )
                          );
                          return elements;
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
          {/* <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href="#"
            className={`${activeMenuItem === "elements" ? "open" : ""}`}
            onClick={() => toggleMenuItem("elements")}
          >
            <Category />
          </Link>
        </li> */}
        </div>

        <li
          className="with-megamenu has-menu-child-item position-static 
        d-lg-none d-xxl-none d-xl-none d-sm-block "
        >
          <Link
            href=""
            className={`${activeMenuItem === "courses" ? "open" : ""}`}
            onClick={() => toggleMenuItem("courses")}
          >
            Courses
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu grid-item-3 ${
              activeMenuItem === "courses" ? "active d-block" : ""
            }`}
          >
            <div className="wrapper">
              <div className="row row--15 single-dropdown-menu-presentation">
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Online Course</h3>
                  <ul className="mega-menu-item">
                    {OnlineCourses?.map((data, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={`/course/${data.course_link}`}
                            className={
                              isActive(data.course_link) ? "active" : ""
                            }
                          >
                            {data.course_name} - ({data?.shortName})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Distance Courses</h3>
                  <ul className="mega-menu-item">
                    {DistanceCourses?.map((data, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={`course/${data.course_link}`}
                            className={
                              isActive(data.course_link) ? "active" : ""
                            }
                          >
                            {data.course_name} - ({data?.shortName})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Master Courses</h3>
                  <ul className="mega-menu-item">
                    {AllMasterCourses?.map((data, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={`course/${data.course_link}`}
                            className={
                              isActive(data.course_link) ? "active" : ""
                            }
                          >
                            {data.course_name} - ({data?.shortName})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Bachelor Courses</h3>
                  <ul className="mega-menu-item">
                    {AllBachelorCourses?.map((data, index) => {
                      return (
                        <li key={index}>
                          <Link
                            href={`course/${data.course_link}`}
                            className={
                              isActive(data.course_link) ? "active" : ""
                            }
                          >
                            {data.course_name} - ({data?.shortName})
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Diploma Courses</h3>
                  <ul className="mega-menu-item">
                    {DiplomaCourses?.length > 0 ? (
                      DiplomaCourses?.map((data, index) => {
                        return (
                          <li key={index}>
                            <Link
                              href={`course/${data.course_link}`}
                              className={
                                isActive(data.course_link) ? "active" : ""
                              }
                            >
                              {data.course_name} - ({data?.shortName})
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li>We Will Update Soon</li>
                    )}
                  </ul>
                </div>
                <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <h3 className="rbt-short-title">Certificate Courses</h3>
                  <ul className="mega-menu-item">
                    {CertificationCourses?.length > 1 ? (
                      CertificationCourses?.map((data, index) => {
                        if (data.menuType === "grid-item-Explore") {
                          const elements = data.menuItems?.map(
                            (value, innerIndex) =>
                              value.id > 0 &&
                              value.id <= 14 && (
                                <li key={innerIndex}>
                                  <Link
                                    href={value.link}
                                    className={
                                      isActive(value.link) ? "active" : ""
                                    }
                                  >
                                    {value.title}
                                    {value.coming ? (
                                      <span className="rbt-badge-card ms-3">
                                        {value.coming}
                                      </span>
                                    ) : value.subTitle ? (
                                      <span className="rbt-badge-card">
                                        {value.subTitle}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                </li>
                              )
                          );
                          return elements;
                        }
                      })
                    ) : (
                      <li>We Will Update Soon</li>
                    )}
                  </ul>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-lg-12">
                  <div className="btn-wrapper">
                    <Link
                      className="rbt-btn btn-gradient hover-icon-reverse square btn-xl w-100 text-center mt--30 hover-transform-none"
                      href="#"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Visit Histudy Template</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </li>

        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href=""
            className={`${activeMenuItem === "elements" ? `open ` : ""}`}
            onClick={() => toggleMenuItem("elements")}
          >
            Resources
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu grid-item-0 ${
              activeMenuItem === "elements" ? "active d-block" : ""
            }`}
            style={{ zIndex: "1111" }}
          >
            <div className="wrapper">
              <div className="row row--10 single-dropdown-menu-presentation">
                <ElementsLayout
                  title={"Resources"}
                  MenuData={MenuData?.menuData}
                  menuGrid="grid-item-Resource"
                  num1={0}
                  num2={9}
                />
                {/* <ElementsLayout
                  MenuData={MenuData?.menuData}
                  menuGrid="grid-item-3"
                  num1={10}
                  num2={18}
                />
                <ElementsLayout
                  MenuData={MenuData?.}
                  menuGrid="grid-item-3"
                  num1={19}
                  num2={26}
                /> */}
                {/* <div className="col-lg-6 col-xxl-6 single-mega-item">
                  <div className="rbt-ads-wrapper">
                    <Link className="d-block" href="#">
                      <Image src={addImage} alt="Education Images" />
                    </Link>
                  </div>
                </div> */}
              </div>
              {/* <div className="row">
                <div className="col-lg-12">
                  <div className="btn-wrapper">
                    <Link
                      className="rbt-btn btn-gradient hover-icon-reverse square btn-xl w-100 text-center mt--30 hover-transform-none"
                      href="#"
                    >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Visit Histudy Template</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </li>
        <li className="with-megamenu has-menu-child-item position-static">
          <Link
            href=""
            className={`${activeMenuItem === "blog" ? "open" : ""}`}
            onClick={() => toggleMenuItem("blog")}
          >
            Explore
            <i className="feather-chevron-down"></i>
          </Link>
          <div
            className={`rbt-megamenu grid-item-0 ${
              activeMenuItem === "blog" ? "active d-block" : ""
            }`}
            style={{ zIndex: "1111" }}
          >
            <div className="wrapper">
              <div className="row row--10 ">
                {/* <div className="col-lg-12 col-xl-4 col-xxl-12 single-mega-item">
                  <h3 className="rbt-short-title">More</h3>
                  <ul className="mega-menu-item">
                    {MenuData &&
                      MenuData.menuData.map((data, index) => {
                        if (data.menuType === "grid-item-5") {
                          const elements = data.menuItems?.map(
                            (value, innerIndex) =>
                              value.id <= 7 && (
                                <li key={innerIndex}>
                                  <Link
                                    className={
                                      isActive(value.link) ? "active" : ""
                                    }
                                    href={
                                      value.coming ? "/maintenance" : value.link
                                    }
                                  >
                                    {value.title}
                                    {value.coming ? (
                                      <span className="rbt-badge-card ms-3">
                                        {value.coming}
                                      </span>
                                    ) : value.subTitle ? (
                                      <span className="rbt-badge-card">
                                        {value.subTitle}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                </li>
                              )
                          );
                          return elements;
                        }
                      })}
                  </ul>
                </div> */}
                <div className="col-lg-12 col-xl-12 col-xxl-12 single-mega-item">
                  {/* <h3 className="rbt-short-title">Explore</h3> */}
                  <ul className="mega-menu-item">
                    {MenuData &&
                      MenuData.menuData.map((data, index) => {
                        if (data.menuType === "grid-item-Explore") {
                          const elements = data.menuItems?.map(
                            (value, innerIndex) =>
                              value.id > 0 &&
                              value.id <= 14 && (
                                <li key={innerIndex}>
                                  <Link
                                    href={value.link}
                                    className={
                                      isActive(value.link) ? "active" : ""
                                    }
                                  >
                                    {value.title}
                                    {value.coming ? (
                                      <span className="rbt-badge-card ms-3">
                                        {value.coming}
                                      </span>
                                    ) : value.subTitle ? (
                                      <span className="rbt-badge-card">
                                        {value.subTitle}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Link>
                                </li>
                              )
                          );
                          return elements;
                        }
                      })}
                  </ul>
                </div>
                {/* <div className="col-lg-8 col-xl-6 col-xxl-6 single-mega-item">
                  <div className="rbt-ads-wrapper">
                    <Link className="d-block" href="#">
                      <Image src={addImage} alt="Education Images" />
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
