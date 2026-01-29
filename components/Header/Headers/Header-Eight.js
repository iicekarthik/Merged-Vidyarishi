import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import HeaderRightTwo from "../Header-Right/HeaderRight-Two";
import Search from "../Offcanvas/Search";
import Category from "../Category/Category";
import Nav from "../Nav";

// import logo from "../../../public/images/logo/logo.png";
import logo from "../../../public/images/vidya/logo/VR_logo.png";
import { useAppContext } from "@/context/Context";
import { useScreenSize } from "@/hooks/screenSize";

const HeaderEight = ({
  headerType,
  gapSpaceBetween,
  sticky,
  headerSticky,
  navigationEnd,
  container,
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const { Courses, setCourses } = useAppContext();
  const ScreenSize = useScreenSize();
  const BigScreenSize = ["lg"].includes(ScreenSize);

  useEffect(() => {
    if (BigScreenSize) {
      setCourses(true);
    }
  }, [!BigScreenSize && !Courses]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`rbt-header-wrapper ${gapSpaceBetween} ${sticky}  ${
          !headerType && isSticky ? `${headerSticky}` : ""
        }`}
      >
        <div className={`${container}`}>
          <div className={`mainbar-row ${navigationEnd} align-items-center`}>
            <div className="header-left rbt-header-content">
              <div className="header-info">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      width={180}
                      height={82}
                      style={{
                        objectFit: "contain",
                      }}
                      priority={true}
                      alt="Vidyarishi Logo"
                    />
                  </Link>
                </div>
              </div>

              <div
                className="header-info d-none d-lg-block"
                style={{ marginLeft: "30px" }}
              >
                <Category />
              </div>
            </div>

            {/* <div className="rbt-main-navigation d-none d-xl-block">
              <Nav />
            </div> */}

            <HeaderRightTwo
              userType="Admin"
              btnText="Enquire Know"
              btnClass="
              rbt-marquee-btn marquee-auto 
              btn-border-gradient radius-round 
              btn-sm hover-transform-none"
            />
          </div>
        </div>
        <Search />
      </div>
    </>
  );
};

export default HeaderEight;
