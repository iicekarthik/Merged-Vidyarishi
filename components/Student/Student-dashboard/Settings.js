// "use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AllCoursesVidya from "@/data/vidya/VidyaCourses.json";
import IndianStates from "@/data/indianStates.json";
import { toast } from "react-toastify";

const Setting = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    website: "",
    github: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);

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
    const res = await fetch(
      "/api/dashboard/profile/user-upload-photo",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Image upload failed");
      return;
    }

    setPhotoPreview(data.profileImage);
    setUser((prev) => ({
      ...prev,
      profileImage: {
        url: data.profileImage,
        public_id: prev?.profileImage?.public_id,
      },
    }));

    toast.success("Profile photo updated successfully");
  } catch (err) {
    toast.error("Failed to upload profile photo");
  }
};
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/dashboard/profile/profileroute", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message || data.error || "Failed to fetch user");
          setLoading(false);
          return;
        }

        setUser({
          ...data,
          skill: data.skill || "",
          biography: data.biography || "",
          alternatePhone: data.alternatePhone || "",
          alternateEmail: data.alternateEmail || "",
        });

        setBio(data.biography || "");
        setSocialLinks({
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          linkedin: data.linkedin || "",
          website: data.website || "",
          github: data.github || "",
        });
      } catch (err) {
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // helper: robust name splitting
  const splitName = (fullName = "") => {
    const parts = (fullName || "").trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    return { firstName, lastName };
  };

  // helper: validate phone (basic Indian 10-digit)
  const isValidPhone = (p) => {
    if (!p) return true; // allow empty
    return /^[0-9]{10}$/.test(p);
  };

  const isValidEmail = (email) => {
  if (!email) return true; // allow empty
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

 const handleUpdateProfile = async (e) => {
  e.preventDefault();
  if (!user) return;

  const { firstName, lastName } = splitName(user.fullName || "");

  if (!firstName.trim()) {
    toast.error("First name is required");
    return;
  }

  if (!isValidPhone(user.alternatePhone)) {
    toast.error("Alternate phone must be a valid 10-digit number");
    return;
  }

  if (!isValidEmail(user.alternateEmail)) {
    toast.error("Alternate email is invalid");
    return;
  }

  if (bio.length > 300) {
    toast.error("Bio should not exceed 300 characters");
    return;
  }

  const payload = {
    firstName,
    lastName,
    alternatePhone: user.alternatePhone,
    alternateEmail: user.alternateEmail,
    skill: user.skill,
    biography: bio,
    gender: user.gender,
    dob: user.dob,
    qualification: user.qualification,
    state: user.state,
    city: user.city,
    course: user.course,
  };

  setSavingProfile(true);
  try {
    const res = await fetch(
      "/api/dashboard/profile/update-profile-info",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      toast.error(data.message || "Profile update failed");
      return;
    }

    setUser(data.user);
    setBio(data.user.biography || "");

    toast.success("Profile updated successfully");
  } catch (err) {
    toast.error("Something went wrong while saving profile");
  } finally {
    setSavingProfile(false);
  }
};

const handleUpdateSocial = async (e) => {
  e.preventDefault();

  for (const key of Object.keys(socialLinks)) {
    if (!isSafeUrl(socialLinks[key])) {
      toast.error(
        `${key.toUpperCase()} must start with http:// or https://`
      );
      return;
    }
  }

  setSavingSocial(true);
  try {
    const res = await fetch(
      "/api/dashboard/profile/update-profile-social",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(socialLinks),
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== "success") {
      toast.error(data.message || "Failed to update social links");
      return;
    }

    setSocialLinks({
      facebook: data.user?.facebook || "",
      twitter: data.user?.twitter || "",
      linkedin: data.user?.linkedin || "",
      website: data.user?.website || "",
      github: data.user?.github || "",
    });

    toast.success("Social links updated successfully");
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setSavingSocial(false);
  }
};


  if (loading) return <p>Loading...</p>;
  if (!user)
    return <p className="rbt-dashboard-content bg-color-white rbt-shadow-box p-3">Please login to edit settings.</p>;

  const { firstName, lastName } = splitName(user.fullName || "");

  return (
    <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
      <div className="content">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Settings</h4>
        </div>

        <div className="advance-tab-button mb--30">
          <ul className="nav nav-tabs tab-button-style-2 justify-content-start" id="settinsTab-4" role="tablist">
            <li role="presentation">
              <Link href="#" className="tab-button active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" role="tab" aria-controls="profile" aria-selected="true">
                <span className="title">Profile</span>
              </Link>
            </li>

            <li role="presentation">
              <Link href="#" className="tab-button" id="social-tab" data-bs-toggle="tab" data-bs-target="#social" role="tab" aria-controls="social" aria-selected="false">
                <span className="title">Social Share</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          <div className="tab-pane fade active show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="rbt-dashboard-content-wrapper">
              <div className="tutor-bg-photo bg_image bg_image--23 height-245"></div>
              <div className="rbt-tutor-information">
                <div className="rbt-tutor-information-left">
                  <div className="thumbnail rbt-avatars size-lg position-relative">
                    <Image
                      width={200}
                      height={130}
                      src={photoPreview || user.profileImage?.url || "/images/team/avatar.jpg"}
                      alt="Student"
                      className="rounded-circle"
                    />

                    <div className="rbt-edit-photo-inner">

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        id="studentPhoto"
                        onChange={(e) => uploadPhoto(e.target.files[0])}
                      />

                      <button
                        type="button"
                        className="rbt-edit-photo"
                        onClick={() =>
                          document.getElementById("studentPhoto").click()
                        }
                      >
                        <i className="feather-camera" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rbt-tutor-information-right">
                  <div className="tutor-btn">
                    <Link className="rbt-btn btn-sm btn-border color-white radius-round-10" href="#">
                      Edit Cover Photo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <form className="rbt-profile-row rbt-default-form row row--15" onSubmit={handleUpdateProfile}>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="rbt-form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input id="firstname" type="text" value={firstName} onChange={(e) => setUser((prev) => ({ ...prev, fullName: `${e.target.value} ${lastName}`.trim() }))} />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="rbt-form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input id="lastname" type="text" value={lastName} onChange={(e) => setUser((prev) => ({ ...prev, fullName: `${firstName} ${e.target.value}`.trim() }))} />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="rbt-form-group">
                  <label>Alternate Phone Number</label>
                  <input
                    type="tel"
                    value={user.alternatePhone || ""}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        alternatePhone: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="rbt-form-group">
                  <label>Alternate Email</label>
                  <input
                    type="email"
                    value={user.alternateEmail || ""}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        alternateEmail: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <label>Gender</label>
                <select
                  value={user.gender || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={user.dob ? user.dob.split("T")[0] : ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              </div>
              <div className="col-lg-6">
                <label>Highest Qualification</label>
                <select
                  value={user.qualification || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, qualification: e.target.value }))
                  }
                >
                  <option value="">Highest Qualification</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>Diploma</option>
                  <option>Undergraduate (UG)</option>
                  <option>Postgraduate (PG)</option>
                  <option>Working Professional</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label>State</label>
                <select
                  value={user.state || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, state: e.target.value }))
                  }
                >
                  <option value="">Select State</option>
                  {IndianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-6">
                <label>City</label>
                <input
                  type="text"
                  value={user.city || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="rbt-form-group">
                  <label htmlFor="skill">Skill/Occupation</label>
                  <input id="skill" type="text" value={user?.skill ?? ""} onChange={(e) => setUser((prev) => ({ ...prev, skill: e.target.value }))} />
                </div>
              </div>

              <div className="col-12">
                <label>Course Interested</label>
                <select
                  value={user.course || ""}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, course: e.target.value }))
                  }
                >
                  <option value="">Select Course Interested</option>
                  {AllCoursesVidya?.all_Courses
                    ?.filter((c) => {
                      const type = String(c?.course_type || "").toLowerCase();
                      return type === "online" || type === "distance";
                    })
                    .map((course) => (
                      <option key={course.course_link} value={course.course_link}>
                        {course.course_name} ({course.course_type})
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12">
                <div className="rbt-form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea id="bio" cols={20} rows={5} value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
              </div>

              <div className="col-12 mt--20">
                <div className="rbt-form-group">
                  <button type="submit" className="rbt-btn btn-gradient" disabled={savingProfile}>
                    {savingProfile ? "Saving..." : "Update Info"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="tab-pane fade" id="social" role="tabpanel" aria-labelledby="social-tab">
            <form className="rbt-profile-row rbt-default-form row row--15" onSubmit={handleUpdateSocial}>
              {["facebook", "twitter", "linkedin", "website", "github"].map((key) => (
                <div className="col-12" key={key}>
                  <div className="rbt-form-group">
                    <label htmlFor={key}>
                      {key === "facebook" && <i className="feather-facebook"></i>}
                      {key === "twitter" && <i className="feather-twitter"></i>}
                      {key === "linkedin" && <i className="feather-linkedin"></i>}
                      {key === "website" && <i className="feather-globe"></i>}
                      {key === "github" && <i className="feather-github"></i>} {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input id={key} type="text" placeholder={`https://${key}.com/`} value={socialLinks[key]} onChange={(e) => setSocialLinks((prev) => ({ ...prev, [key]: e.target.value }))} />
                  </div>
                </div>
              ))}

              <div className="col-12 mt--10">
                <div className="rbt-form-group">
                  <button type="submit" className="rbt-btn btn-gradient" disabled={savingSocial}>
                    {savingSocial ? "Saving..." : "Update Social Links"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
