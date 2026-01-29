import Link from "next/link";
import React from "react";

const HeaderRightOne = () => {
  return (
    <div className="header-right">
      <div className="rbt-btn-wrapper d-none d-xl-block">
        <Link
          className="rbt-btn rbt-marquee-btn marquee-auto btn-border-gradient radius-round btn-sm hover-transform-none"
          href="https://themeforest.net/checkout/from_item/42846507?license=regular"
        >
          <span data-text="Purchase Now">Purchase Now</span>
        </Link>
      </div>
      <div className="mobile-menu-bar d-block d-xl-none">
        <div className="hamberger">
          <button className="hamberger-button rbt-round-btn">
            <i className="feather-menu"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderRightOne;
