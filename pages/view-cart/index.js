import React from "react";
import PageHead from "../Head";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import BackToTop from "@/pages/backToTop";
import StudentDashboardHeader from "@/components/Student/Student-dashboard/StudentDashboardHeader";
import StudentDashboardSidebar from "@/components/Student/Student-dashboard/StudentDashboardSidebar";
import ViewCart from "@/components/Student/Student-dashboard/ViewCart";

const ViewCartPage = () => {
  return (
    <>
      <PageHead
        title="View cart | Vidyarishi"
        description="Review selected courses in your cart and proceed to secure online payment on Vidyarishi."
      />

      <MobileMenu />
      <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

      <div className="rbt-page-banner-wrapper">
        <div className="rbt-banner-image" />
      </div>
      <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <StudentDashboardHeader />

              <div className="row g-5">
                <div className="col-lg-3">
                  <StudentDashboardSidebar />
                </div>
                <div className="col-lg-9">
                  <ViewCart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
      <Separator />
      {/* <FooterOne /> */}

    </>
  );
};
export default ViewCartPage;
