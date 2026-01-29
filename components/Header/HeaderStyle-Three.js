import React from "react";
import HeaderTopEight from "./Header-Top/HeaderTop-Eight";
import HeaderMidOne from "./Header-Top/HeaderMid-One";
import HeaderTen from "./Headers/Header-Ten";
import DarkSwitch from "./dark-switch";

const HeaderStyleThree = ({ headerSticky }) => {
  return (
    <>
      <DarkSwitch />
      <header className={`rbt-header rbt-header-10`}>
        <div className="rbt-sticky-placeholder"></div>
        <HeaderTopEight
          bgColor="bg-color-darker rbt-border-bottom"
          gapSpaceBetween="header-space-betwween"
          container="container-fluid"
        />
        <HeaderMidOne
          container="container-fluid"
          gapSpaceBetween="header-space-betwween"
          bgColor="bg-color-white rbt-border-bottom"
        />
        <HeaderTen
          headerSticky={headerSticky}
          sticky="header-sticky"
          container="container-fluid"
          gapSpaceBetween="header-space-betwween"
          navigationEnd="rbt-navigation-center"
        />
      </header>
    </>
  );
};

export default HeaderStyleThree;
