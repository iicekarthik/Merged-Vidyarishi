"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/vidyarishiapi/lib/axios";
import { Link } from "react-scroll";
import IndianStates from "@/data/indianStates.json";
import { toast } from "react-toastify";
import { isValidPhone, isValidEmail } from "@/vidyarishiapi/utils/validators";

const Setting = () => {
  const [admin, setAdmin] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const uploadPhoto = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await api.post(
        "/api/admin/profile/upload-photo",
        formData,
        { withCredentials: true }
      );

      setPhotoPreview(res.data.profilePhoto);
      toast.success("Profile photo updated successfully");
    } catch (err) {
      toast.error("Failed to upload profile photo");
    }

  };

  // Profile Info State
  const [profileData, setProfileData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    skill: "",
    biography: "",
    alternatePhone: "",
    alternateEmail: "",
  });

  // Social Links State
  const [socialData, setSocialData] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    website: "",
    github: "",
  });

  // 🔹 Fetch admin profile
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/api/admin/profile", {
          withCredentials: true,
        });

        const a = res.data.admin;
        setAdmin(a);

        setProfileData({
          fullName: a.fullName || "",
          dob: a.dob ? a.dob.split("T")[0] : "",
          gender: a.gender || "",
          state: a.state || "",
          city: a.city || "",
          skill: a.skill || "",
          biography: a.biography || "",
          alternatePhone: a.alternatePhone || "",
          alternateEmail: a.alternateEmail || "",
        });

        setSocialData({
          facebook: a.facebook || "",
          twitter: a.twitter || "",
          linkedin: a.linkedin || "",
          website: a.website || "",
          github: a.github || "",
        });
      } catch (err) {
        console.error("Failed to fetch admin", err);
      }
    };

    fetchAdmin();
  }, []);

  if (!admin) return null;

  // 🔹 Handlers
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  };

  const handleSocialChange = (e) => {
    setSocialData({ ...socialData, [e.target.id]: e.target.value });
  };

  // 🔹 Update Profile Info
  const updateProfileInfo = async () => {
    // 🔴 Required fields
    if (!profileData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    // 🔴 Phone validation
    if (
      profileData.alternatePhone &&
      !isValidPhone(profileData.alternatePhone)
    ) {
      toast.error("Alternate phone must be a valid 10-digit number");
      return;
    }

    // 🔴 Email validation
    if (
      profileData.alternateEmail &&
      !isValidEmail(profileData.alternateEmail)
    ) {
      toast.error("Alternate email is not valid");
      return;
    }

    // 🔴 Bio length check
    if (profileData.biography.length > 300) {
      toast.error("Bio should not exceed 300 characters");
      return;
    }

    try {
      await api.put(
        "/api/admin/profile/update-info",
        profileData,
        { withCredentials: true }
      );

      toast.success("Profile information updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile information");
    }
  };

  // helper: basic safe url check
  const isSafeUrl = (value) => {
    if (!value) return true; // allow empty
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const updateSocialLinks = async () => {
    for (const key of Object.keys(socialData)) {
      const value = socialData[key];

      if (!isSafeUrl(value)) {
        toast.error(
          `${key.toUpperCase()} must start with http:// or https://`
        );
        return;
      }
    }

    try {
      await api.put(
        "/api/admin/profile/update-social",
        socialData,
        { withCredentials: true }
      );

      toast.success("Social links updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update social links");
    }
  };

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Settings</h4>
        </div>

        {/* Tabs */}
        <div className="advance-tab-button mb--30">
          <ul
            className="nav nav-tabs tab-button-style-2 justify-content-start"
            role="tablist"
          >
            <li role="presentation">
              <Link
                href=""
                className="tab-button active"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                role="tab"
                aria-selected="true"
              >
                <span className="title">Profile</span>
              </Link>
            </li>

            <li role="presentation">
              <Link
                href=""
                className="tab-button"
                id="social-tab"
                data-bs-toggle="tab"
                data-bs-target="#social"
                role="tab"
                aria-selected="false"
              >
                <span className="title">Social Share</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* TAB CONTENT */}
        <div className="tab-content">

          {/* PROFILE TAB */}
          <div
            className="tab-pane fade show active"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {/* Profile Header */}
            <div className="rbt-dashboard-content-wrapper">
              <div className="tutor-bg-photo bg_image bg_image--23 height-245" />
              <div className="rbt-tutor-information">
                <div className="rbt-tutor-information-left">
                  <div className="thumbnail rbt-avatars size-lg position-relative">
                    <Image
                      width={250}
                      height={130}
                      src={photoPreview || admin.profilePhoto?.url || "/images/team/avatar-2.jpg"}
                      alt="Admin"
                      className="rounded-circle"
                    />

                    <div className="rbt-edit-photo-inner">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        id="profilePhotoInput"
                        onChange={(e) => uploadPhoto(e.target.files[0])}
                      />

                      <button
                        className="rbt-edit-photo"
                        type="button"
                        onClick={() =>
                          document.getElementById("profilePhotoInput").click()
                        }
                      >
                        <i className="feather-camera" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rbt-tutor-information-right">
                  <div className="tutor-btn">
                    <Link
                      className="rbt-btn btn-sm btn-border color-white radius-round-10"
                      href="#"
                    >
                      Edit Cover Photo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form className="rbt-default-form row row--15 mt--30">
              {[
                ["fullName", "Full Name"],
                ["alternatePhone", "Alternate Phone"],
                ["alternateEmail", "Alternate Email"],
                ["skill", "Skill / Occupation"],
              ].map(([id, label]) => (
                <div className="col-lg-6" key={id}>
                  <div className="rbt-form-group">
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id}
                      value={profileData[id]}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
              ))}

              {/* State */}
              <div className="col-lg-6">
                <div className="rbt-form-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    value={profileData.state}
                    onChange={handleProfileChange}
                    className="w-100"
                  >
                    <option value="">Select State</option>
                    {IndianStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City */}
              <div className="col-lg-6">
                <div className="rbt-form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    value={profileData.city}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="col-12 mt--10">
                <div className="rbt-form-group">
                  <label htmlFor="biography">Bio</label>
                  <textarea
                    id="biography"
                    rows="4"
                    value={profileData.biography}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="col-12 mt--20">
                <button
                  type="button"
                  className="rbt-btn btn-gradient"
                  onClick={updateProfileInfo}
                >
                  Update Info
                </button>
              </div>
            </form>
          </div>

          {/* SOCIAL TAB */}
          <div
            className="tab-pane fade"
            id="social"
            role="tabpanel"
            aria-labelledby="social-tab"
          >
            <form className="rbt-default-form row row--15 mt--30">
              {Object.keys(socialData).map((key) => (
                <div className="col-12" key={key}>
                  <div className="rbt-form-group">
                    <label htmlFor={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      id={key}
                      value={socialData[key]}
                      onChange={handleSocialChange}
                    />
                  </div>
                </div>
              ))}

              <div className="col-12 mt--10">
                <button
                  type="button"
                  className="rbt-btn btn-gradient"
                  onClick={updateSocialLinks}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );

};

export default Setting;
