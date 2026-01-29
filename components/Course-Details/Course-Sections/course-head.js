import Image from "next/image";
import bannerimg from "@/public/images/popluar-courses/bannerImg.png";
import { getCourseStats } from "@/vidyarishiapi/utils/courseStats";
import { handleBuyNow } from "@/vidyarishiapi/utils/buyNow";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/Context";
import { useState } from "react";
import EnquiryModal from "../../Student/Enquiry/EnquiryModal";

const CourseHead = ({ checkMatch, courseContent = [], isEnrolled }) => {
  if (!checkMatch) return null;

  const router = useRouter();
  const { user, setIsOpenLoginModal } = useAppContext();
  const isAdmin = user?.isAdmin || user?.role === "admin";

  const hero = checkMatch.meta?.hero || {};
  const { durationLabel } = getCourseStats(courseContent);

  const [showEnquiry, setShowEnquiry] = useState(false);
  const isQuizOnlyCourse = checkMatch?.contentType === "quizOnly";

  const bannerSrc =
    hero.bannerImage?.url || bannerimg;

  return (
    <>
      {/* ✅ Enquiry Modal */}
      {showEnquiry && (
        <EnquiryModal
          courseId={checkMatch.courseId}   // ✅ PASS IT
          courseName={checkMatch.title}
          onClose={() => setShowEnquiry(false)}
        />
      )}

      <div
        style={{
          minHeight: "420px",
          alignItems: "center",
        }}
      >
        {/* Banner */}
        <div style={{ width: "100%", height: "50px" }}>
          <Image
            width={1500}
            height={500}
            src={bannerSrc}
            alt={checkMatch.title}
            style={{ objectFit: "fill" }}
            priority
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="content text-start">
                {/* Breadcrumb */}
                <ul className="page-list">
                  <li className="rbt-breadcrumb-item">Home</li>
                  <li>
                    <i className="feather-chevron-right"></i>
                  </li>
                  <li className="rbt-breadcrumb-item active">
                    {checkMatch.category}
                  </li>
                </ul>

                {/* Title */}
                <h3 className="title">{checkMatch.title}</h3>

                {hero.subtitle && <p>✅ {hero.subtitle}</p>}
                {hero.placement && (
                  <p className="feather-briefcase">{hero.placement}</p>
                )}

                <p className="feather-calendar">{durationLabel}</p>

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {/* <button
                    type="button"
                    className="rbt-btn btn-border"
                    onClick={() => {
                      const brochureUrl = checkMatch?.meta?.brochure?.url;
                      // ✅ If logged in (user or admin) → direct download
                      if (user) {
                        if (brochureUrl) {
                          const link = document.createElement("a");
                          link.href = brochureUrl;
                          link.download = `${checkMatch.title}-Brochure.pdf`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } else {
                          alert("Brochure not available");
                        }
                        return;
                      }

                      // ❌ If NOT logged in → show enquiry form
                      setShowEnquiry(true);
                    }}
                  >
                    {/* if (brochureUrl) {
                        window.open(brochureUrl, "_blank"); // ✅ real download
                      } else {
                        setIsOpenLoginModal(false);
                        setShowEnquiry(true); // fallback
                      }
                    }}
                  > 
                    <i className="feather-download"></i> Download Brochure
                  </button> */}
                  <button
                    type="button"
                    className="rbt-btn btn-border"
                    onClick={async () => {
                      // ❌ Not logged in → show enquiry
                      if (!user) {
                        setShowEnquiry(true);
                        return;
                      }

                      // ✅ Logged in → download brochure
                      try {
                        const res = await fetch(
                          `/api/dashboard/course/download-brochure?courseId=${checkMatch.courseId}`
                        );

                        if (!res.ok) throw new Error("Download failed");

                        const blob = await res.blob();
                        const url = window.URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${checkMatch.title}-Brochure.pdf`;
                        document.body.appendChild(a);
                        a.click();

                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                      } catch (err) {
                        alert("Brochure not available");
                      }
                    }}

                  >

                    <i className="feather-download"></i> Download Brochure
                  </button>
                  {!isAdmin && !isEnrolled && (
                    <button
                      className="rbt-btn btn-gradient"
                      onClick={() =>
                        handleBuyNow({
                          user,
                          course: checkMatch,
                          router,
                          setIsOpenLoginModal,
                        })
                      }
                    >
                      <i className="feather-log-in"></i> Enroll Now
                    </button>
                  )}

                  {!isAdmin && isEnrolled && (
                    <button
                      className="rbt-btn btn-border"
                      onClick={() =>
                        router.push(
                          isQuizOnlyCourse
                            ? `/course-player/${checkMatch.courseId}/quiz`
                            : `/course-player/${checkMatch.courseId}`
                        )
                      }
                    >
                      <i className="feather-play"></i>
                      Go to Course
                      {/* {isQuizOnlyCourse ? " Go to Course" : " Go to Course"} */}
                    </button>

                    // <button
                    //   className="rbt-btn btn-border"
                    //   onClick={() =>
                    //     router.push(`/course-player/${checkMatch.courseId}`)
                    //   }
                    // >
                    //   <i className="feather-play"></i> Go to Course
                    // </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default CourseHead;