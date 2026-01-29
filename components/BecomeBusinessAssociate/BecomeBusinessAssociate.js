import { useState } from "react";
import CategorySlider from "../Category/CategoriesSlider";
import Link from "next/link";
import PartnerFAQ from "./PartnerFAQ";
import { FaHandshake, FaRegHandshake } from "react-icons/fa6";
import BusinessForm from "./BusinessForm";
import { useScreenSize } from "@/hooks/screenSize";

const BecomeBusinessAssociate = () => {
  const benefitCards = [
    {
      icon: "📚",
      title: "Extensive Product Portfolio",
      subtitle: "India’s Leading Online Universities on One Unified Platform",
      description:
        "Gain access to a wide range of UGC-approved, NAAC-accredited online & distance education programs—all under one roof.",
    },
    {
      icon: "💸",
      title: "Zero Investment, Maximum Impact",
      subtitle: "No Upfront Cost. Endless Possibilities.",
      description:
        "Expand your offerings at zero cost and cater to every learner’s need with ease and confidence.",
    },
    {
      icon: "🛠️",
      title: "Dedicated Support 24×7×365",
      subtitle: "Robust Tech + Real People = Seamless Experience",
      description:
        "Get constant support and cutting-edge tools from the Vidyarishi team to streamline counseling and conversions.",
    },
    {
      icon: "🌐",
      title: "Work On Your Terms",
      subtitle: "Complete Flexibility, Total Control",
      description:
        "Counsel and earn from anywhere, at any time—your comfort is our priority.",
    },
    {
      icon: "💰",
      title: "Unlimited Earning Potential",
      subtitle: "Incentives that Scale with Your Effort",
      description:
        "Online education is the future—and with every student you guide, your commission grows.",
    },
    {
      icon: "🏆",
      title: "Recognize. Represent. Rise.",
      subtitle: "Be the Face of India’s Premier Institutions",
      description:
        "Partner with top NAAC A, A+ grade universities and establish your credibility in the fastest-growing education domain.",
    },
  ];

  const sectionSkyTitle = [
    {
      number: "1️",
      title: "Want to be your own boss and build your own brand?",
      desc: "Take charge of your future as an independent education consultant.",
    },
    {
      number: "2️⃣",
      title: "Looking to increase your income while doing meaningful work?",
      desc: "Turn your counseling skills into a consistent and scalable source of income.",
    },
    {
      number: "3️⃣",
      title: "Passionate about making a difference in students’ lives?",
      desc: "Help learners choose the right university and course, and become a catalyst for change.",
    },
    {
      number: "4️⃣",
      title: "Ready to take the first step?",
      desc: "👉 Register with Vidyarishi today and start your journey as a trusted education partner. Let’s turn your aspirations into impact—together.",
    },
  ];

  const partnerCategories = [
    {
      icon: "🎓",
      title: "Academic Institutions",
      items: [
        "Tuition Centers",
        "Tutorial Academies",
        "Coaching Institutes",
        "Pre-Schools & Learning Centers",
        "Degree Colleges",
      ],
    },
    {
      icon: "👩‍🏫",
      title: "Independent Professionals",
      items: ["Freelance Counselors & Mentors", "Home Tutors & Educators"],
    },
    {
      icon: "🏠",
      title: "Aspiring Entrepreneurs",
      items: [
        "Students & Graduates",
        "Housewives & Remote Workers",
        "Working Professionals",
      ],
    },
  ];

  const [isPopUpBusinessForm, setisPopUpBusinessForm] = useState(false);

  const ScreenSize = useScreenSize();
  const BigScreen = ["xxl", "xl", "lg"].includes(ScreenSize);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Section 1: Two Columns Side by Side */}
        <div
          style={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: BigScreen ? "60px 100px" : "40px 20px",
            flexDirection: BigScreen ? "row" : "column",
            // background: "linear-gradient(to right, #2f57ef21, #80008021)",
            color: "black",
          }}
        >
          {/* Left Content Section */}
          <div
            style={{
              width: BigScreen ? "60%" : "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "40px",
              paddingRight: BigScreen ? "40px" : "10px",
            }}
          >
            {/* Heading + Description */}
            <div style={{ maxWidth: "800px" }}>
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#333",
                  marginBottom: "16px",
                  lineHeight: "1.4",
                }}
              >
                {/* <span
                style={{
                  fontSize: "36px",
                  verticalAlign: "top",
                  color: "#b966e7",
                  marginRight: "8px",
                }}
              >
                “
              </span> */}
                Vidyarishi{" "}
                <FaRegHandshake size={45} style={{ color: "#7b42f6" }} />{" "}
                Partners{" "}
                {/* <FaRegHandshake size={45} style={{ color: "#7b42f6" }} /> */}
                {/* <FaHandshake size={45} style={{ color: "#7b42f6" }} /> */}
              </h3>
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "#7b42f6",
                  marginBottom: "12px",
                }}
              >
                Your One-Stop Solution for Counselors and Mentors
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: "1.6",
                  margin: "0",
                  padding: "0",
                }}
              >
                Empowering counselors and mentors with a centralized platform to
                effortlessly search, compare, and recommend the most suitable
                online universities for their students. With Vidyarishi, guiding
                your students toward the right academic path has never been
                faster or more reliable.
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#333",
                  marginTop: "10px",
                  marginBottom: "0",
                }}
              >
                Discover. Advise. Transform.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={() => setisPopUpBusinessForm(true)}
                className="rbt-btn8"
                style={{
                  padding: "12px 32px",
                  fontSize: "16px",
                  marginTop: "0",
                }}
              >
                Enquire Now
              </button>
            </div>
          </div>

          {/* Right Image / Visual Section */}
          <div
            style={{
              width: BigScreen ? "40%" : "100%",
              padding: BigScreen ? "20px" : "0px",
              marginTop: BigScreen ? "0" : "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Placeholder – Replace with actual image or illustration */}
            {/* <img
            src="/images/partners-banner.png"
            alt="Vidyarishi Partnership"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          /> */}
            {/* section form */}
            <BusinessForm />
          </div>
        </div>

        <section
          style={{
            backgroundColor: "#ffffff",
            padding: BigScreen ? "60px 100px" : "40px 20px",
            minHeight: "60vh",
            color: "#000",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Heading */}
          <div style={{ maxWidth: "800px", marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                lineHeight: "1.4",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  verticalAlign: "top",
                  color: "#7b42f6",
                  marginRight: "8px",
                }}
              >
                “
              </span>
              Who Can Become a Vidyarishi Partner?
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              If you're passionate about education, mentorship, and meaningful
              transformation — there's a space for you at{" "}
              <strong style={{ color: "#7b42f6" }}>Vidyarishi</strong>. We
              welcome individuals and institutions with the zeal to guide and
              empower learners across the country.
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {partnerCategories?.map((category, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "black",
                  padding: "20px 20px",
                  borderRadius: "12px",
                  border: "3px solid #b966e721",
                  boxShadow: "0 0px 20px lightgray",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0px 20px lightgray";
                }}
              >
                <h4
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "black",
                    // marginBottom: "12px",
                  }}
                >
                  {category.icon} {category.title}
                </h4>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    color: "black",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    margin: "0",
                  }}
                >
                  {category?.items?.map((item, i) => (
                    <li key={i}>{item}</li> 
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "30px",
            }}
          >
            <button
              onClick={() => setisPopUpBusinessForm(true)}
              style={{
                padding: "12px 24px",
                backgroundColor: "#b966e7",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#800080")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#b966e7")
              }
            >
              Become a Vidyarishi Partner
            </button>
          </div>
        </section>

        {/* Section 2 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: BigScreen ? "60px 100px" : "40px 20px",
            minHeight: "60vh",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          {/* Heading & Description */}
          <div style={{ maxWidth: "800px", marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                lineHeight: "1.4",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  verticalAlign: "top",
                  color: "#b966e7",
                  marginRight: "8px",
                }}
              >
                “
              </span>
              Approved Online & Distance Education Universities
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              <strong style={{ color: "#7b42f6" }}>Vidyarishi</strong> is a
              trusted partner of the following esteemed{" "}
              <strong style={{ color: "#7b42f6" }}>
                online and distance education universities.
              </strong>{" "}
              We bring credible academic options right to your fingertips.
            </p>
          </div>

          {/* Slider Component */}
          <div style={{ padding: "0 20px", marginBottom: "40px" }}>
            <CategorySlider />
          </div>

          {/* CTA Button */}
          <div className="mt-5">
            <Link
              style={{ float: BigScreen ? "right" : "right" }}
              href="/our-partners"
              className="rbt-btn8"
            >
              View All Partners
            </Link>
          </div>
        </div>

        {/* Section 3 */}
        <div
          style={{
            minHeight: "auto",
            padding: BigScreen ? "60px 100px" : "40px 20px",
            color: "black",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Intro Heading */}
          <div style={{ maxWidth: "800px", marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                lineHeight: "1.4",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  verticalAlign: "top",
                  color: "#b966e7",
                  marginRight: "8px",
                }}
              >
                “
              </span>
              Why Partner with Vidyarishi?
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              Collaborating with{" "}
              <strong style={{ color: "#7b42f6" }}>Vidyarishi</strong> means
              unlocking a dynamic network of opportunities. We bridge the gap
              between students and institutions, empowering mentors and
              counselors to provide smarter, faster, and more credible academic
              guidance.
            </p>
          </div>

          {/* Benefit Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(375px, 1fr))",
              gap: "20px",
            }}
          >
            {benefitCards?.map((card, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "15px 20px",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  boxShadow: "0 0px 15px lightgray",
                  border: "3px solid #b966e721",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  // e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                  {card.icon}
                </div>
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0",
                  }}
                >
                  {card.title}
                </h4>
                <h5
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#7b42f6",
                    margin: "0 0 10px 0",
                  }}
                >
                  {card.subtitle}
                </h5>
                <p
                  style={{ fontSize: "13px", color: "#555", lineHeight: "1.5" }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            padding: BigScreen ? "60px 100px" : "40px 20px",
            minHeight: "60vh",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          {/* Heading & Description */}
          <div style={{ maxWidth: "800px", marginBottom: "40px" }}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#333",
                marginBottom: "20px",
                lineHeight: "1.4",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  verticalAlign: "top",
                  color: "#b966e7",
                  marginRight: "8px",
                }}
              >
                “
              </span>
              At Vidyarishi, the Sky is Just the Beginning!
            </h3>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              <strong style={{ color: "#7b42f6" }}>Vidyarishi</strong> is a
              transformative initiative designed to unlock endless opportunities
              in the world of online education. As a platform that bridges
              counselors with India’s top UGC-approved online universities and
              courses, our mission is to empower you to counsel faster, smarter,
              and with 100% authentic and verified information.
              <br />
              Our reliable and well-structured framework ensures that students
              receive the right guidance at the right time—every time.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "0px 0px",
              // textAlign: "center",
            }}
          >
            {/* Card Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "30px",
                marginBottom: "60px",
              }}
            >
              {sectionSkyTitle?.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "30px 25px",
                    borderRadius: "12px",
                    border: "3px solid #b966e721",
                    boxShadow: "0 0px 20px lightgray",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* <div style={{ fontSize: "20px", marginBottom: "12px" }}>
                  Step {item.number}
                </div> */}
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    {item.number} {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      lineHeight: "1.6",
                      textAlign: "left",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {/* <button
            className="rbt-btn8"
            style={{
              padding: "14px 36px",
              fontSize: "16px",
              backgroundColor: "#7b42f6",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(123, 66, 246, 0.3)",
            }}
          >
            Register Now
          </button> */}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
            }}
          >
            <button
              onClick={() => setisPopUpBusinessForm(true)}
              style={{
                padding: "12px 24px",
                backgroundColor: "#7b42f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#652dc1")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#7b42f6")
              }
            >
              Yes, I Want to Join
            </button>
          </div>
        </div>

        {/* Section 5 */}
        <div
          style={{
            minHeight: "90vh",
            backgroundColor: "#F9F9FF",
            padding: "20px",
          }}
        >
          <div className="rbt-accordion-area bg-color-extra2 rbt-section-gapBottom">
            <PartnerFAQ />
          </div>
        </div>
      </div>

      {isPopUpBusinessForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // transparent black background
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={
              {
                // backgroundColor: "#fff",
                // borderRadius: "12px",
                // padding: "30px",
                // maxWidth: "600px",
                // width: "100%",
                // boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                // position: "relative",
              }
            }
          >
            <BusinessForm
              isPopUpBusinessForm={isPopUpBusinessForm}
              setisPopUpBusinessForm={setisPopUpBusinessForm}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BecomeBusinessAssociate;

// <div>
// <Link
//   href="/our-partners"
//   style={{
//     padding: "10px 24px",
//     backgroundColor: "#b966e7",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "8px",
//     textDecoration: "none",
//     transition: "all 0.3s ease",
//   }}
//   onMouseOver={(e) => {
//     e.target.style.backgroundColor = "#a556d1";
//   }}
//   onMouseOut={(e) => {
//     e.target.style.backgroundColor = "#b966e7";
//   }}
// >
//   View All Partners
// </Link>
// </div>
