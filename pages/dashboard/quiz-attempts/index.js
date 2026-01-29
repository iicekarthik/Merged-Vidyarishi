import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import FooterThree from "@/components/Footer/Footer-Three";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import QuizAttempts from "@/components/Student/Student-dashboard/QuizAttempts";
import StudentDashboardHeader from "@/components/Student/Student-dashboard/StudentDashboardHeader";
import StudentDashboardSidebar from "@/components/Student/Student-dashboard/StudentDashboardSidebar";
import Context from "@/context/Context";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";
import Store from "@/redux/store";
import { Provider } from "react-redux";

const StudentQuiz = () => {
  return (
    <>
      <PageHead
        title="My Quiz Attempts | Student Dashboard – Vidyarishi"
        description="View your quiz attempts on Vidyarishi. Check scores, attempt history, and quiz completion status for your courses."
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
                  <StudentDashboardHeader />

                  <div className="row g-5">
                    <div className="col-lg-3">
                      <StudentDashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                      <QuizAttempts />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BackToTop />
          <Separator />
        </Context>
      </Provider>
    </>
  );
};

export default StudentQuiz;
