import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Separator from "../Common/Separator";
import { useScreenSize } from "@/hooks/screenSize";
import VidyaHorizontalBlogSlider from "./VidyaHorizontalBlogSlider";
import VidyaBlogCategoryList from "./VidyaBlogCategoryList";
import PrivacyFooter from "../termAndCondition/PrivacyFooter";
import NewsletterTwo from "../Newsletters/Newsletter-Two";
import NewsletterThree from "../Newsletters/Newsletter-Three";
 
// import Image from "next/image";
// import ImagePreview from "./PrevieBlog/Image/imagePreview";

const convertTimestampToDate = (timestamp) => {
  if (!timestamp) return "Invalid Date";

  const date = new Date(timestamp); // Works for ISO strings or timestamps

  if (isNaN(date.getTime())) return "Invalid Date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }); // Apr, May, etc.
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

const VidyaBlog = ({ AllBlogposts }) => {
  const IsActive = true;

  const screenSize = useScreenSize();
  const BigScreen =
    (["xxl", "xl", "lg"].includes(screenSize) && screenSize) || false;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          paddingTop: "60px",
          padding: BigScreen ? "0px 100px" : "00px 20px",
          color: "black",
          textAlign: "justify",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "25px 0px 0px 0px" }}>
          <h3
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "0px",
              paddingBottom: "0px",
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
            </span>
            VidyaRishi Blog! */}
            {/* <div
              style={{
                marginLeft: "60px",
                width: "180px",
              }}
            >
              <hr
                style={{
                  border: "none",
                  height: "3px",
                  backgroundColor: "#b966e7",
                }}
              />
            </div> */}
          </h3>
          {/* <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
            <strong style={{ color: "#7b42f6" }}>Vidyarishi</strong> is a
            transformative initiative designed to unlock endless opportunities
            in the world of online education. As a platform that bridges
            counselors with India’s top UGC-approved online universities and
            courses, our mission is to empower you to counsel faster, smarter,
            and with 100% authentic and verified information.
            <br />
            Our reliable and well-structured framework ensures that students
            receive the right guidance at the right time—every time.
          </p> */}
        </div>

        {/* <VidyaHorizontalBlogSlider /> */}
      </div>

      <div
        style={{
          // minHeight: "100vh", // full viewport height for vertical centering
          padding: BigScreen ? "0px 100px" : "0px 20px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center", // vertical centering
          justifyContent: "center", // horizontal centering
          flexDirection: "column", // column layout
          textAlign: "left", // center align text
          marginBottom: "20px",
        }}
      >
        <div>
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
                color: "#800080",
                marginRight: "8px",
              }}
            >
              “
            </span>
            <strong style={{ color: "#800080" }}> Vidyarishi Blog </strong>{" "}
            <br /> Learn. Decide. Succeed.
          </h3>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
            Stay ahead of the curve with{" "}
            <strong style={{ color: "#800080" }}>Vidyarishi's</strong> expertly
            curated blog. From online universities to Career Guidance, we
            deliver{" "}
            <strong style={{ color: "#800080" }}>
              Clear, Credible, And Actionable Knowledge
            </strong>{" "}
            that empowers students, mentors, and professionals alike.
          </p>
        </div>
      </div>

      {AllBlogposts?.length > 0 ? (
        <VidyaBlogCategoryList BlogPosts={AllBlogposts} />
      ) : (
        <div
          style={{
            padding: BigScreen ? "0px 100px" : "0px 20px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "left",
            marginBottom: "20px",
          }}
        >
          <h5
            style={{
              width: "100%",
              height: "40vh",
              display: "flex",
              alignItems: "center", // vertical centering
              justifyContent: "center", // horizontal centering
              flexDirection: "column", // column layout
              textAlign: "left", // center align text
              color: "#800080",
            }}
          >
            Blogs Not Available Now
          </h5>
        </div>
      )}

      {/* <div
        className="mb--60 mt--60 py-5"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          background: "#b966e7",
        }}
      >
        <NewsletterThree />
      </div> */}

      <PrivacyFooter title={"Blog"} />
    </>
  );
};

export default VidyaBlog;

// <div
//   style={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     // minHeight: "90vh",
//     padding: BigScreen ? "4rem" : "2rem",
//   }}
// >
//   <div
//     style={{
//       width: "100%",
//       padding: BigScreen ? "0rem 0 0 6rem" : "0rem 0rem",
//       // textAlign: "center",
//     }}
//   >
//     {/* <h1
//       style={{
//         fontSize: "3.5rem",
//         fontWeight: "bold",
//         color: "#1f2937",
//         marginBottom: "1rem",
//       }}
//     >
//       Blog Coming Soon!
//     </h1>
//     <p style={{ fontSize: "1.8rem", color: "black" }}>
//       We are working hard to bring you amazing content. Stay tuned!
//     </p> */}
//     {IsActive && (
//       <div>
//         {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "10px",
//             marginTop: "2rem",
//           }}
//         >
//           {posts?.map((post) => {
//             const publishedDate = convertTimestampToDate(
//               post?.publishedAt
//             );

//             const imageNodes = post?.content?.root?.children?.filter(
//               (child) => child?.fields?.media?.url
//             );

//             const imageUrl =
//               imageNodes?.[0]?.fields?.media?.url ||
//               "/images/vidya/homeSlide1/online_mba.png";

//             return (
//               <div
//                 key={post.id}
//                 style={{
//                   backgroundColor: "#ffffff",
//                   borderRadius: "12px",
//                   textAlign: "left",
//                   padding: "16px",
//                   marginBottom: "24px",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   cursor: "pointer",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.02)";
//                   e.currentTarget.style.boxShadow =
//                     "0 6px 20px rgba(0, 0, 0, 0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 12px rgba(0, 0, 0, 0.1)";
//                 }}
//               >
//                 <Link
//                   href={`/blog/${post.slug}`}
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <div
//                     style={{ overflow: "hidden", borderRadius: "10px" }}
//                   >
//                     <img
//                       src={imageUrl}
//                       width="100%"
//                       height="auto"
//                       style={{
//                         maxHeight: "200px",
//                         objectFit: "cover",
//                         borderRadius: "10px",
//                         transition: "transform 0.3s ease",
//                       }}
//                       alt="Image Preview"
//                       onMouseOver={(e) =>
//                         (e.currentTarget.style.transform = "scale(1.05)")
//                       }
//                       onMouseOut={(e) =>
//                         (e.currentTarget.style.transform = "scale(1)")
//                       }
//                     />
//                   </div>

//                   <h2
//                     style={{
//                       fontSize: "1.5rem",
//                       margin: "6px 6px 0px 6px",
//                       color: "#333",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {post?.title}
//                   </h2>
//                   <p
//                     style={{
//                       fontSize: "12px",
//                       padding: "6px 0px",
//                       margin: "0 6px",
//                     }}
//                   >
//                     Published at : {publishedDate}
//                   </p>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     )}
//   </div>
// </div>
