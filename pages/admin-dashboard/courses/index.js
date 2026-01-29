"use client";

import { Provider } from "react-redux";

import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";

import FooterOne from "@/components/Footer/Footer-One";
import Separator from "@/components/Common/Separator";

import Context from "@/context/Context";
import Store from "@/redux/store";

import AdminDashboardHeader from "@/components/Admin/AdminDashboard/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/Admin/AdminDashboard/AdminDashboardSidebar";

import AdminCoursesContent from "@/components/Admin/Courses/AdminCoursesContent";

export default function AdminCoursesPage() {
  return (
    <>
      <PageHead
        title="Vidyarishi Courses | Admin Dashboard"
        description="Manage all courses from Vidyarishi admin dashboard"
      />
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <Cart />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <AdminDashboardHeader />

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <AdminDashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                      <AdminCoursesContent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BackToTop />
          <Separator />
          {/* <FooterOne /> */}
        </Context>
      </Provider>

    </>
  );
}
