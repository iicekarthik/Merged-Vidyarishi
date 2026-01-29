import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Student/Student-dashboard/Cart";
import Profile from "@/components/Student/Student-dashboard/Profile";
import StudentDashboardHeader from "@/components/Student/Student-dashboard/StudentDashboardHeader";
import StudentDashboardSidebar from "@/components/Student/Student-dashboard/StudentDashboardSidebar";
import PageHead from "@/pages/Head";
import BackToTop from "@/pages/backToTop";

import { useEffect, useState } from "react";

const StudentProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const res = await fetch("/api/dashboard/profile/profileroute", {
          method: "GET",
          credentials: "include", // browser cookies (HttpOnly tokens) automatically send karta hai
        });

        if (!res.ok) {              //Agar backend ne error code bheja (401, 500, 404) → console me error
          console.error("Profile fetch failed:", res.status);
          return;
        }

        // JSON data ko React state me daal diya → UI updated
        const data = await res.json();
        setUser(data);
      } catch (err) {                        //Agar API call fail ho jaye (network error etc)
        console.error("Profile fetch error:", err.message);
      }
    };

    fetchProfile();
  }, []);      //[] ensures ye effect sirf component load hone per chale.

  return (
    <>
      <PageHead
        title="My Profile | Student Account – Vidyarishi"
        description="Manage your student account, personal information, enrolled courses, and certificates."
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
                  <Profile user={user} />
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

export default StudentProfile;
