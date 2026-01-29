import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import StudentDashboardHeader from "@/components/Student/Student-dashboard/StudentDashboardHeader";
import StudentDashboardSidebar from "@/components/Student/Student-dashboard/StudentDashboardSidebar";
import Wishlist from "@/components/Student/Student-dashboard/Wishlist";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";

const StudentWishlist = () => {
  return (
    <>
      <PageHead
        title="My Wishlist Courses | Student Dashboard – Vidyarishi"
        description="Explore and manage your saved courses in your Vidyarishi wishlist."
      />

      <MobileMenu />
      <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
      {/* <Cart /> */}

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
                  <Wishlist />
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

export default StudentWishlist;
