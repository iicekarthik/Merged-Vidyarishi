import Link from "next/link";
import React, { useEffect, useState } from "react";
import VidyaBlog from "@/data/vidya/VidyaBlog.json";
import axios from "axios";
import { useScreenSize } from "@/hooks/screenSize";

const convertTimestampToDate = (timestamp) => {
  if (!timestamp || isNaN(Number(timestamp))) return "Invalid Date";
  const date = new Date(Number(timestamp));
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

const RecentBlog = ({ post, slug }) => {
  const ScreenSize = useScreenSize();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_BLOG_ROUTE}/blog/published`,
        {}
      );
      setPosts(response?.data);
      // console.log("recent", response?.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Unable to load posts. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts?.filter((p) => p?.slug !== slug);

  const truncateWords = (text, wordLimit) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div>
      <h5
        style={{
          marginTop: "30px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Recent Blogs
      </h5>

      <div
        style={{
          display: "flex",
          flexDirection:
            ScreenSize === "xs" || ScreenSize === "sm" ? "row" : "column",
          width: ScreenSize === "xs" || ScreenSize === "sm" ? "auto" : "auto",
          overflow: "auto",
          alignItems: "center",
          gap: "16px",
          marginTop: "16px",
          marginBottom: "30px",
          flexWrap:
            ScreenSize === "xs" || ScreenSize === "sm" ? "nowrap" : "wrap",
        }}
        className="webkitAds"
      >
        {filteredPosts?.length > 0 ? (
          filteredPosts.slice(0, 8).map((post) => (
            <div
              key={post._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
                flex:
                  ScreenSize === "xs" || ScreenSize === "sm"
                    ? "0 0 auto"
                    : "1 1 calc(33.33% - 32px)",
                minWidth:
                  (ScreenSize === "xs" || ScreenSize === "sm") && "280px",
                // maxWidth: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: "0px 14px"
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
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "10px",
                    marginTop: "4px",
                  }}
                >
                  <img
                    src={post?.thumbnailUrl || "/default-blog.jpg"}
                    width="100%"
                    height="auto"
                    style={{
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "transform 0.3s ease",
                    }}
                    alt={post?.title || "Blog image"}
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
                    margin: "10px 6px 6px 6px",
                    color: "#333",
                    fontWeight: "600",
                  }}
                >
                  {post?.title}
                </h2>

                {/* <p
                  style={{
                    fontSize: "12px",
                    padding: "4px 6px 0px 6px",
                    margin: "0",
                    color: "#444",
                    fontWeight: "bold",
                  }}
                >
                  {post?.categories?.map((val) => val.name).join(" | ")}
                </p> */}

                {/* <p
                  style={{
                    fontSize: "12.5px",
                    padding: "6px 6px 0 6px",
                    margin: "0",
                    color: "#333",
                    lineHeight: "1.5",
                  }}
                >
                  {truncateWords(post.shortDescription, 10)}
                </p> */}
              </Link>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "16px", color: "#666", marginTop: "8px" }}>
            No recent blogs available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentBlog;
