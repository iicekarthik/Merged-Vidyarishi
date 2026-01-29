"use client";
import { formatCourseNameFromJSON } from "../../../utils/courseFormatter";

const Profile = ({ user }) => {
  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">My Profile</h4>
        </div>

        {user && (
          <>
            <ProfileRow label="Registration Date" value={new Date(user.createdAt).toLocaleString()} />
            <ProfileRow label="Full Name" value={user.fullName} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow label="Alternate Email" value={user.alternateEmail || "-"} />
            <ProfileRow label="Phone Number" value={user.phone} />
            <ProfileRow label="Alternate Phone Number" value={user.alternatePhone || "-"} />
            <ProfileRow label="Gender" value={user.gender || "-"} />
            <ProfileRow label="DOB" value={user.dob ? new Date(user.dob).toLocaleDateString() : "-"} />
            <ProfileRow label="Qualification" value={user.qualification || "-"} />
            <ProfileRow label="State" value={user.state || "-"} />
            <ProfileRow label="City" value={user.city || "-"} />
            <ProfileRow
              label="Course"
              value={formatCourseNameFromJSON(user.course)}
            />
            <ProfileRow label="Skill/Occupation" value={user.skill || "-"} />
            <ProfileRow label="Biography" value={user.biography || "-"} />
          </>
        )}
      </div>
    </div>
  );
};

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

export default Profile;
