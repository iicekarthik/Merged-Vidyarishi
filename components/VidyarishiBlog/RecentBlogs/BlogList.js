import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const convertTimestampToDate = (timestamp) => {
  if (!timestamp || isNaN(Number(timestamp))) return "Invalid Date";
  const date = new Date(Number(timestamp));
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/posts");
      setPosts(response?.data?.docs);
      // console.log("......", response?.data?.docs);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Unable to load posts. Please try again later.");
    }
  };

  useEffect(() => {
    // fetchPosts();
  }, []);

  return (
    <div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <h5>Recent Bolgs</h5>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {posts?.length > 0 ? (
          posts?.map((post) => {
            const publishedDate = convertTimestampToDate(
              post?.publishedAt?.$date?.$numberLong
            );

            const imageNodes = post?.content?.root?.children?.filter(
              (child) => child?.fields?.media?.url
            );

            const imageUrl =
              imageNodes?.[0]?.fields?.media?.url ||
              "/images/vidya/homeSlide1/online_mba.png";

            return (
              <div
                key={post.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  textAlign: "left",
                  padding: "16px",
                  marginBottom: "24px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                    <img
                      src={imageUrl}
                      width="100%"
                      height="auto"
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease",
                      }}
                      alt="Image Preview"
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>

                  <h2
                    style={{
                      fontSize: "1.5rem",
                      margin: "6px 6px 0px 6px",
                      color: "#333",
                      fontWeight: "600",
                    }}
                  >
                    {post?.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "12px",
                      padding: "6px 0px",
                      margin: "0 6px",
                    }}
                  >
                    Published at :{" "}
                    {publishedDate === "Invalid Date" ? "N/A" : publishedDate}
                  </p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
