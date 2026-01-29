import Image from "next/image";
import Link from "next/link";

// import logo from "../../public/images/logo/logo.png";
import logo from "../../public/images/vidya/logo/VR_logo.png";

import FooterData from "../../data/footer.json";
import SingleFooter from "./FooterProps/SingleFooter";
import CopyRight from "./CopyRight";
import Social from "../Socials";
import { useAppContext } from "@/context/Context";
import PopupForm from "../PopupForm/PopupForm";
import AllCourses from "@/data/vidya/VidyaCourses.json";
import University from "@/data/vidya/University.json";
import { useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/screenSize";

const FooterThree = () => {
  const { isOpen, setIsOpen } = useAppContext();

  const [OnlineCourses, setOnlineCourses] = useState([]);
  const [DistanceCourses, setDistanceCourses] = useState([]);
  const [BachelorCourses, setBachelorCourses] = useState([]);
  const [BachelorCoursesTwo, setBachelorCoursesTwo] = useState([]);
  const [AllBachelorCourses, setAllBachelorCourses] = useState([]);
  const [MasterCourses, setMasterCourses] = useState([]);
  const [MasterCoursesTwo, setMasterCoursesTwo] = useState([]);
  const [AllMasterCourses, setAllMasterCourses] = useState([]);
  const [UgDiplomaCourses, setUgDiplomaCourses] = useState([]);
  const [PgDiplomaCourses, setPgDiplomaCourses] = useState([]);
  const [CertificationCourses, setCertificationCourses] = useState([]);

  const [onlineMba, setOnlineMba] = useState([]);
  const [distanceMba, setDistanceMba] = useState([]);
  const [OnlineDistanceMba, setOnlineDistanceMba] = useState([]);

  const [onlineUniversity, setOnlineUniversity] = useState([]);
  const [distanceUniversity, setDistanceUniversity] = useState([]);
  const [onlineDistanceUniversity, setOnlineDistanceUniversity] = useState([]);

  useEffect(() => {
    if (!AllCourses?.all_Courses || !Array.isArray(AllCourses?.all_Courses))
      return;

    const extractCourses = (
      modeFilter,
      degreeLevelFilter,
      courseNameFilter
    ) => {
      const degreeOrder = ["Masters", "Bachelors", "Diploma", "Certificate"];

      return AllCourses.all_Courses
        .filter((course) => {
          const matchesMode =
            !modeFilter || modeFilter.includes(course.course_type);

          const matchesCourseName =
            !courseNameFilter || courseNameFilter.includes(course.shortName);

          const matchesDegreeLevel =
            !degreeLevelFilter ||
            (Array.isArray(degreeLevelFilter)
              ? degreeLevelFilter.includes(course.degree_type)
              : course.degree_type === degreeLevelFilter);

          return matchesMode && matchesDegreeLevel && matchesCourseName;
        })
        .sort(
          (a, b) =>
            degreeOrder.indexOf(a.degree_type) -
            degreeOrder.indexOf(b.degree_type)
        );
    };

    // Online and Distance Courses
    setOnlineCourses(
      extractCourses(["Online"], ["Masters", "Bachelors"], null)
    );

    setDistanceCourses(extractCourses(["Distance"], null, null));

    // Bachelors Degree Courses
    const bachelorsOnline = extractCourses(
      ["Online", "F-Tell"],
      "Bachelors",
      null
    );
    const bachelorsDistance = extractCourses(["Distance"], "Bachelors", [
      "BLIS",
    ]);
    setBachelorCourses(bachelorsOnline);
    setBachelorCoursesTwo(bachelorsDistance);
    setAllBachelorCourses([...bachelorsOnline, ...bachelorsDistance]);

    // Masters Degree Courses
    const mastersOnline = extractCourses(["Online", "F-Tell"], "Masters", null);
    const mastersDistance = extractCourses(["Distance"], "Masters", ["MLIS"]);
    setMasterCourses(mastersOnline);
    setMasterCoursesTwo(mastersDistance);
    setAllMasterCourses([...mastersOnline, ...mastersDistance]);

    // Online and Distance MBA Courses
    setOnlineMba(extractCourses(["Online"], "Masters", ["MBA"]));
    setDistanceMba(extractCourses(["Distance"], "Masters", ["MBA"]));
    setOnlineDistanceMba([
      ...extractCourses(["Online"], "Masters", ["MBA"]),
      ...extractCourses(["Distance"], "Masters", ["MBA"]),
    ]);

    // Diploma Courses
    setUgDiplomaCourses(extractCourses(null, "Undergraduate Diploma", null));
    setPgDiplomaCourses(extractCourses(null, "Postgraduate Diploma", null));

    // Certification Courses
    setCertificationCourses(
      extractCourses(null, "UG Certifications", null).concat(
        extractCourses(null, "PG Certifications", null)
      )
    );
  }, [AllCourses]);

  useEffect(() => {
    if (
      !University?.AllUniversities ||
      !Array.isArray(University?.AllUniversities)
    )
      return;

    const extractCourses = (
      filterFn = () => true,
      modeFilter = null,
      CourseNameFilter = null,
      choiceFilter = null
    ) => {
      const degreeOrder = ["Online", "Distance"];

      return University?.AllUniversities?.filter((university) => {
        const matchesMode =
          !modeFilter ||
          (Array.isArray(modeFilter)
            ? modeFilter.includes(university.mode)
            : university.mode === modeFilter);

        const matchesCourseName =
          !CourseNameFilter ||
          (Array.isArray(CourseNameFilter)
            ? CourseNameFilter.includes(university.shortName)
            : university.shortName === CourseNameFilter);

        const matchesChoice =
          !choiceFilter ||
          (Array.isArray(choiceFilter)
            ? choiceFilter.includes(university.choice)
            : university.choice === choiceFilter);

        return (
          matchesMode &&
          matchesCourseName &&
          matchesChoice &&
          filterFn(university)
        );
      }).sort(
        (a, b) => degreeOrder.indexOf(a.mode) - degreeOrder.indexOf(b.mode)
      );
    };

    // 🔹 Bachelors Degree Courses
    const Online = extractCourses(() => true, ["Online"], "", "");
    const Distance = extractCourses(() => true, ["Distance"], "", "");

    setOnlineUniversity(Online);
    setDistanceUniversity(Distance);

    // ✅ Functional Update for Reliable Merging
    setOnlineDistanceUniversity((prev) => [...Online, ...Distance]);
  }, [University]);

  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(document.body, true);
    }
  }, []);

  const [vidyarishiCourses, setVidyarishiCourses] = useState([]);

  useEffect(() => {
    const fetchCourseNames = async () => {
      const res = await fetch("/api/footer/courses/names");
      const data = await res.json();
      setVidyarishiCourses(data);
    };

    fetchCourseNames();
  }, []);

  const ScreenSize = useScreenSize();
  const BigScreen = ["xxl", "xl", "lg"].includes(ScreenSize);
  const BigScreen2 = ["xxl"].includes(ScreenSize);

  return (
    <>
      <footer className="rbt-footer footer-style-1">
        <div className="footer-top">
          <div className="container">
            {FooterData &&
              FooterData.footerOne.map((footer, index) => (
                <>
                  <div
                    className="row-lg-12 row-md-6 row-sm-6 row-12 mt--0 mb--40"
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: BigScreen ? "nowrap" : "wrap",
                      justifyContent: BigScreen ? "space-between" : "center",
                      flexDirection: BigScreen ? "row" : "column",
                      alignItems: BigScreen ? "center" : "stretch",
                      gap: BigScreen ? "32px" : "24px",
                      rowGap: !BigScreen ? "40px" : "0px",
                    }}
                  >
                    {/* Logo & Description */}
                    <div
                      className="footer-widget"
                      style={{
                        flex: BigScreen ? "1 1 550px" : "1 1 100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        width: "100%",
                      }}
                    >
                      <div>
                        <Link href="/">
                          <Image
                            src={logo}
                            width={180}
                            height={82}
                            style={{ objectFit: "contain" }}
                            priority={true}
                            alt="Vidyarishi Logo"
                          />
                        </Link>
                      </div>

                      <p
                        className="description"
                        style={{
                          textAlign: "justify",
                          fontSize: "14px",
                          lineHeight: "1.6",
                        }}
                      >
                        {footer.description}
                      </p>

                      <div>
                        <button
                          onClick={() => setIsOpen(true)}
                          className="rbt-btn3 btn-gradient"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div
                      style={{
                        flex: BigScreen2 ? "1 1 0px" : "1 1 0",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "flex-start",
                        marginTop: !BigScreen ? "40px" : "0px",
                      }}
                    >
                      {/* Trustpilot */}
                      <div
                        className="trustpilot-widget"
                        data-locale="en-US"
                        data-template-id="53aa8807dec7e10d38f59f32"
                        data-businessunit-id="YOUR-BUSINESS-UNIT-ID"
                        data-style-height="24px"
                        data-style-width="100%"
                        data-theme="light"
                        style={{
                          backgroundColor: "#ffffff",
                          width: "320px", // ✅ Fixed width
                          padding: "12px 16px",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src="/images/vidya/footer/Trustpilot.png"
                            alt="Trustpilot"
                            width={35}
                            height={35}
                          />
                          <a
                            href="https://www.trustpilot.com/review/vidyarishi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#000",
                              marginLeft: "10px",
                              fontSize: "14px",
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            Trustpilot
                          </a>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#1D4ED8",
                            color: "#ffffff",
                            fontSize: "14px",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>3.7</span>
                          <span>⭐</span>
                        </div>
                      </div>

                      {/* Career Karma */}
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          width: "320px", // ✅ Fixed width
                          padding: "12px 16px",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Image
                            src="/images/vidya/footer/CareerKarma.png"
                            alt="Career Karma"
                            width={35}
                            height={35}
                          />
                          <p
                            style={{
                              color: "#000",
                              marginLeft: "10px",
                              fontSize: "14px",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Career Karma
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#1D4ED8",
                            color: "#ffffff",
                            fontSize: "14px",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>3.6</span>
                          <span>⭐</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--8 mt--30" key={index}>
                    {/*                     
                  <SingleFooter
                    classOne="offset-lg-1 col-lg-4 col-md-3 col-sm-4 col-4"
                    title="Online & Distance Universities"
                    footerType={footer.usefulLinks}
                  /> */}

                    <SingleFooter
                      classOne="col-lg-3 col-md-12 col-sm-12 col-12"
                      style={{ marginTop: "-30px" }}
                      title="Online & Distance Universities"
                      footerType={University?.AllUniversities}
                      isUniversity={true}
                    />

                    <SingleFooter
                      classOne="col-lg-3 col-md-12 col-sm-12 col-12"
                      title="Distance Courses"
                      footerType={DistanceCourses}
                    />

                    <SingleFooter
                      classOne="col-lg-3 col-md-12 col-sm-12 col-12"
                      title="Online Courses"
                      footerType={OnlineCourses}
                    />

                    <SingleFooter
                      classOne="col-lg-3 col-md-12 col-sm-12 col-12"
                      title="Vidyarishi Courses"
                      footerType={vidyarishiCourses}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        columnGap: "5px",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginTop: "20px",
                      }}
                    >
                      <div className="row-lg-3 row-md-6 row-sm-6 row-12 text-center">
                        <ul className="social-icon social-default  justify-content-center mt--20">
                          {footer.socialLink.map((value, innerIndex) => (
                            <li key={innerIndex}>
                              <Link href={value.link}>
                                <i className={value.icon}></i>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {/* <Social
                        classOne="rbt-social-area bg-color-white rbt-section-gap"
                        classList="social-icon social-default with-gradient"
                      /> */}
                      </div>
                      <div className="row-lg-3 row-md-6 row-sm-6 row-12 text-center">
                        <ul className="social-icon social-default icon-naked justify-content-center mt--20">
                          <li>
                            <Link href={"/"}>Home</Link>
                          </li>
                          <li>
                            <Link href={"/about"}>About Us</Link>
                          </li>
                          <li>
                            <Link href={"/contact"}>Contact Us</Link>
                          </li>
                          <li>
                            <Link href={"/become-business-associate"}>
                              Become Business Associate
                            </Link>
                          </li>
                          <li>
                            <Link href={"/pay-online"}>Pay Online</Link>
                          </li>
                          <li>
                            <Link href={"/blog"}>Blog</Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="text-center"
                        style={{ fontSize: "14px", padding: "20px" }}
                      >
                        <div>
                          Register Office
                          <span>
                            : 2/B-14, Vivina, NADCO Shopping Centre, opp.
                            Railway Station, behind Bus Depo, Railway Colony,
                            Andheri West, Mumbai, Maharashtra 400058
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>

        {isOpen && <PopupForm TimeOutSeconds={100} />}
      </footer>
      <CopyRight />
    </>
  );
};

export default FooterThree;
