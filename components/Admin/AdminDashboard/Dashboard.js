"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCounterWidget from "@/components/Admin/AdminDashboard/AdminCounterWidget";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard", {
        withCredentials: true,
      });
      setStats(res.data.stats);
    } catch (err) {
      console.error("Dashboard stats error", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOADING GUARD (MOST IMPORTANT)
  if (loading || !stats) {
    return (
      // <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
      <div className="text-center">
        <div className="content">
          <h5>Loading dashboard...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Dashboard</h4>
        </div>

        <div className="row g-5">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-primary-opacity"
              iconClass="bg-primary-opacity"
              numberClass="color-primary"
              icon="feather-users"
              title="Total Leads"
              value={stats.totalLeads}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-secondary-opacity"
              iconClass="bg-secondary-opacity"
              numberClass="color-secondary"
              icon="feather-user-plus"
              title="New Leads"
              value={stats.newLeads}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-violet-opacity"
              iconClass="bg-violet-opacity"
              numberClass="color-violet"
              icon="feather-phone-call"
              title="Contacted Leads"
              value={stats.contactedLeads}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-pink-opacity"
              iconClass="bg-pink-opacity"
              numberClass="color-pink"
              icon="feather-check-circle"
              title="Converted Leads"
              value={stats.convertedLeads}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-coral-opacity"
              iconClass="bg-coral-opacity"
              numberClass="color-coral"
              icon="feather-book"
              title="Total Courses"
              value={stats.totalCourses}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <AdminCounterWidget
              counterStyle="two"
              styleClass="bg-warning-opacity"
              iconClass="bg-warning-opacity"
              numberClass="color-warning"
              icon="feather-award"
              title="Published Courses"
              value={stats.publishedCourses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
