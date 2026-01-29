"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarData from "@/data/dashboard/admin-dashboard/admin-sidebar.json";

const AdminDashboardSidebar = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/profile", {
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();
        setAdmin(data.admin);
      } catch {
        router.replace("/");
      }
    };

    fetchAdmin();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (!admin) return null;

  return (
    <div className="rbt-default-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
      <div className="inner">
        <div className="content-item-content">
          <div className="rbt-default-sidebar-wrapper">

            {/* HEADER */}
            <div className="section-title mb--20">
              <h6 className="rbt-title-style-2">
                Welcome, {admin.fullName}
              </h6>
            </div>

            {/* MAIN MENU */}
            <nav className="mainmenu-nav">
              <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                {SidebarData.sidebar.slice(0, 6).map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className={pathname === item.link ? "active" : ""}
                    >
                      <i className={item.icon} />
                      <span>{item.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* USER SECTION */}
            <div className="section-title mt--40 mb--20">
              <h6 className="rbt-title-style-2">User</h6>
            </div>

            <nav className="mainmenu-nav">
              <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                {SidebarData.sidebar.slice(6, 9).map((item, index) => {
                  if (item.action === "logout") {
                    return (
                      <li key={index}>
                        <button
                          onClick={handleLogout}
                          className="rbt-btn-link"
                          style={{
                            background: "none",
                            border: "none",
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          <i className={item.icon} />
                          <span>{item.text}</span>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className={pathname === item.link ? "active" : ""}
                      >
                        <i className={item.icon} />
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSidebar;
