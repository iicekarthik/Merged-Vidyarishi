import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarData from "@/data/dashboard/student/student-sidebar.json";
import axios from "axios";
import { logoutUserAPI } from "@/vidyarishiapi/utils/authapi";
import { useAppContext } from "@/context/Context";

const StudentDashboardSidebar = () => {
  const router = useRouter();
  const { cartToggle, setCart } = useAppContext();

  const path = router.pathname;
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/dashboard/profile/profileroute", {
          withCredentials: true,
        });

        setStudentName(res.data.fullName || "User");
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUserAPI();

      router.replace("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  return (
    <>
      <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
        <div className="inner">
          <div className="content-item-content">
            <div className="rbt-default-sidebar-wrapper">
              <div className="section-title mb--20">
                <h6 className="rbt-title-style-2">Welcome, {studentName}</h6>
              </div>

              {/* MAIN MENU (Dashboard, Profile, etc.) */}
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(0, 7).map((data, index) => (
                      <li className="nav-item" key={index} role="presentation">
                        <a
                          className={`${path === data.link ? "active" : ""}`}
                          href={data.link}
                        >
                          <i className={data.icon} />
                          <span>{data.text}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>

              <div className="section-title mt--40 mb--20">
                <h6 className="rbt-title-style-2">User</h6>
              </div>

              {/* USER SECTION (Settings + Logout) */}
              <nav className="mainmenu-nav">
                <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                  {SidebarData &&
                    SidebarData.siderbar.slice(7, 10).map((data, index) => (
                      <li key={index}>
                        {data.action === "view_cart" ? (
                          <button
                            onClick={() => setCart(!cartToggle)}
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              width: "100%",
                              textAlign: "left",
                            }}
                            className="nav-link-btn"
                          >
                            <i className={data.icon} />
                            <span>{data.text}</span>
                          </button>
                        ) : data.action === "logout" ? (
                          <button
                            onClick={handleLogout}
                            className="logout-btn"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            <i className={data.icon} />
                            <span>{data.text}</span>
                          </button>
                        ) : (
                          <a
                            href={data.link}
                            className={`${path === data.link ? "active" : ""}`}
                          >
                            <i className={data.icon} />
                            <span>{data.text}</span>
                          </a>
                        )}
                      </li>
                    ))}

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboardSidebar;
