import { useEffect, useState } from "react";
import api from "@/vidyarishiapi/lib/axios";

const ProfileRow = ({ label, value }) => (
  <div className="rbt-profile-row row row--15 mt--15">
    <div className="col-lg-4 col-md-4">
      <div className="rbt-profile-content b2">{label}</div>
    </div>
    <div className="col-lg-8 col-md-8">
      <div className="rbt-profile-content b2">{value}</div>
    </div>
  </div>
);

const Profile = () => {

  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await api.get("/api/admin/profile", {
          withCredentials: true,
        });
        setAdmin(res.data.admin);
      } catch (error) {
        console.error("Admin profile fetch failed", error);
      }
    };

    fetchAdminProfile();
  }, []);

  if (!admin) return null; // keeps UI intact (no loaders added)

  return (
    <>
        <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">My Profile</h4>
        </div>

        <ProfileRow
          label="Registration Date"
          value={new Date(admin.createdAt).toLocaleString()}
        />

        <ProfileRow label="Full Name" value={admin.fullName || "-"} />
        <ProfileRow label="Email" value={admin.email || "-"} />
        <ProfileRow
          label="Alternate Email"
          value={admin.alternateEmail || "-"}
        />
        <ProfileRow label="Phone Number" value={admin.phone || "-"} />
        <ProfileRow
          label="Alternate Phone Number"
          value={admin.alternatePhone || "-"}
        />

        <ProfileRow label="Gender" value={admin.gender || "-"} />
        <ProfileRow
          label="DOB"
          value={
            admin.dob ? new Date(admin.dob).toLocaleDateString() : "-"
          }
        />
        <ProfileRow label="State" value={admin.state || "-"} />
        <ProfileRow label="City" value={admin.city || "-"} />

        <ProfileRow
          label="Skill / Occupation"
          value={admin.skill || "-"}
        />
        <ProfileRow
          label="Biography"
          value={admin.biography || "-"}
        />
      </div>
    </div>

    </>
  );
};

export default Profile;
