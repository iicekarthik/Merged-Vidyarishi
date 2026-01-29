import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import EnrolledCourses from "@/components/Student/Student-dashboard/Eenrolled-Course";
import StudentDashboardHeader from "@/components/Student/Student-dashboard/StudentDashboardHeader";
import StudentDashboardSidebar from "@/components/Student/Student-dashboard/StudentDashboardSidebar";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";


const StudentCourse = () => {
  return (
    <>
      <PageHead
        title="My Enrolled Courses | Student Dashboard – Vidyarishi"
        description="View and manage your enrolled courses on Vidyarishi. Track your learning progress, access course content, and download certificates."
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
                  <EnrolledCourses />
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

export default StudentCourse;
