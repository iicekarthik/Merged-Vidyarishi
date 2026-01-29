import React from "react";
import HeaderSix from "./Headers/Header-Six";
import HeaderTopBar from "./HeaderTopBar/HeaderTopBar";
import { useRouter } from "next/router";
import DarkSwitch from "./dark-switch";

const HeaderStyleSix = ({ headerType }) => {
  const router = useRouter();
  return (
    <>
      <DarkSwitch />
      <header className={`rbt-header rbt-header-default ${headerType}`}>
        <div className="rbt-sticky-placeholder"></div>
        {router.pathname === "/02-course-school" ? <HeaderTopBar /> : ""}
        <HeaderSix
          sticky="bg-color-white header-sticky"
          gapSpaceBetween=""
          navigationEnd="rbt-navigation-center"
          btnClass="rbt-switch-btn btn-gradient btn-sm hover-transform-none"
          btnText="Join Now"
        />
      </header>
    </>
  );
};

export default HeaderStyleSix;
