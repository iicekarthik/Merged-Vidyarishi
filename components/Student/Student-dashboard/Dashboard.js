import CounterWidget from "@/components/Instructor/Dashboard-Section/widgets/CounterWidget";
import { useEffect, useState } from "react";
import api from "@/vidyarishiapi/lib/axios";

const Dashboard = () => {
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const res = await api.get("/api/dashboard/student/enrolled-courses");
        const courses = Array.isArray(res.data) ? res.data : [];

        setEnrolledCount(courses.filter(c => c.status === "enrolled").length);
        setActiveCount(courses.filter(c => c.status === "active").length);
        setCompletedCount(courses.filter(c => c.status === "completed").length);
      } catch (error) {
        console.error("Dashboard count error:", error);
      }
    };

    fetchDashboardCounts();
  }, []);

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box mb--60">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Dashboard</h4>
        </div>

        <div className="row g-5">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <CounterWidget
              counterStyle="two"
              styleClass="bg-primary-opacity"
              iconClass="bg-primary-opacity"
              numberClass="color-primary"
              icon="feather-book-open"
              title="Enrolled Courses"
              value={enrolledCount}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <CounterWidget
              counterStyle="two"
              styleClass="bg-secondary-opacity"
              iconClass="bg-secondary-opacity"
              numberClass="color-secondary"
              icon="feather-monitor"
              title="Active Courses"
              value={activeCount}
            />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <CounterWidget
              counterStyle="two"
              styleClass="bg-violet-opacity"
              iconClass="bg-violet-opacity"
              numberClass="color-violet"
              icon="feather-award"
              title="Completed Courses"
              value={completedCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
