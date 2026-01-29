import AdminDashboardHeader from "@/components/Admin/AdminDashboard/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/Admin/AdminDashboard/AdminDashboardSidebar";
import Setting from "@/components/Admin/Profile/AdminSettings";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import Context from "@/context/Context";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";
import Store from "@/redux/store";
import { Provider } from "react-redux";

const AdminSettingPage = () => {
  return (
    <>
      <PageHead
        title="Admin Settings | Vidyarishi Dashboard"
        description="Manage administrator profile information and social links securely from the Vidyarishi admin settings dashboard."
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
                      <Setting />
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
};

export default AdminSettingPage;
