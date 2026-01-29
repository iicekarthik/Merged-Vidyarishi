import React, { useEffect, useState } from "react";
import Separator from "../Common/Separator";
import Link from "next/link";
import { MdOutlineVerified } from "react-icons/md";
import Image from "next/image";

// const categories = [
//   "Latest Articles",
//   "MBA",
//   "Software Development",
//   "Data Science",
//   "Artificial Intelligence",
//   "General",
// ];

// const blogCards = [
//   {
//     title: "Product Management in Banking: Driving Innovation & Customer-...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "20 min read",
//     description:
//       "Explore how product management is transforming the banking sector, driving innovation, and enhancing customer-centric strategies in the digital age.",
//   },
//   {
//     title: "Prerequisites for Product Management: What You Need to...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "18 min read",
//     description:
//       "Uncover the essential skills, tools, and educational background required to step confidently into the dynamic field of product management.",
//   },
//   {
//     title: "Linear Discriminant Analysis for Machine Learning: A...",
//     category: "Artificial Intelligence",
//     author: "Pavan Vadapalli",
//     date: "10 Apr 2025",
//     readTime: "21 min read",
//     description:
//       "Dive into the fundamentals of Linear Discriminant Analysis, a powerful technique for dimensionality reduction and classification in machine learning.",
//   },
//   {
//     title: "Product Management in Banking: Driving Innovation & Customer-...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "20 min read",
//     description:
//       "Explore how product management is transforming the banking sector, driving innovation, and enhancing customer-centric strategies in the digital age.",
//   },
//   {
//     title: "Prerequisites for Product Management: What You Need to...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "18 min read",
//     description:
//       "Uncover the essential skills, tools, and educational background required to step confidently into the dynamic field of product management.",
//   },
//   {
//     title: "Linear Discriminant Analysis for Machine Learning: A...",
//     category: "Artificial Intelligence",
//     author: "Pavan Vadapalli",
//     date: "10 Apr 2025",
//     readTime: "21 min read",
//     description:
//       "Dive into the fundamentals of Linear Discriminant Analysis, a powerful technique for dimensionality reduction and classification in machine learning.",
//   },
//   {
//     title: "Product Management in Banking: Driving Innovation & Customer-...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "20 min read",
//     description:
//       "Explore how product management is transforming the banking sector, driving innovation, and enhancing customer-centric strategies in the digital age.",
//   },
//   {
//     title: "Prerequisites for Product Management: What You Need to...",
//     category: "MBA",
//     author: "Jitesh Goel",
//     date: "10 Apr 2025",
//     readTime: "18 min read",
//     description:
//       "Uncover the essential skills, tools, and educational background required to step confidently into the dynamic field of product management.",
//   },
//   {
//     title: "Linear Discriminant Analysis for Machine Learning: A",
//     category: "Artificial Intelligence",
//     author: "Pavan Vadapalli",
//     date: "10 Apr 2025",
//     readTime: "21 min read",
//     description:
//       "Dive into the fundamentals of Linear Discriminant Analysis, a powerful technique for dimensionality reduction and classification in machine learning.",
//   },
// ];

const VidyaBlogCategoryList = ({ BlogPosts }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // console.log("BlogPosts ", BlogPosts);

    // Flatten all categories from blog posts
    const allCategories = BlogPosts.flatMap((item) => item.categories);

    // Create a Map to ensure unique categories by _id
    const categoryMap = new Map();

    allCategories.forEach((cat) => {
      if (!categoryMap.has(cat._id)) {
        categoryMap.set(cat._id, {
          _id: cat._id,
          name: cat.name,
          isActive: cat.isActive,
        });
      }
    });

    const uniqueCategories = Array.from(categoryMap.values());

    // console.log(
    //   "uniqueCategories (with id, name, isActive): ",
    //   uniqueCategories
    // );

    const categoriesWithDefault = [
      { _id: "default", name: "Latest Articles", isActive: true },
      ...uniqueCategories,
    ];

    setCategories(categoriesWithDefault);

    // console.log("categoriesWithDefault: ", categoriesWithDefault);
  }, [BlogPosts]);

  const [activeCategory, setActiveCategory] = useState("Latest Articles");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredBlogs = [...BlogPosts]
    .filter((blog) =>
      activeCategory === "Latest Articles"
        ? true
        : blog.categories.some(
          (cat) => cat.name.toLowerCase() === activeCategory.toLowerCase()
        )
    )
    .sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt).getTime();
      return dateA - dateB;
    });

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // console.log("BlogPosts", BlogPosts)

  return (
    <div style={{ padding: "60px 5%", backgroundColor: "#fff" }}>
      <Separator />
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          margin: "40px 0",
          color: "#111827",
        }}
      >
        Discover Blogs{" "}
        <span style={{ color: "#800080" }}>That Speak to Your Goals</span>
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar Categories */}
        <div
          style={{
            width: "100%",
            maxWidth: "250px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat._id}
                onClick={() => {
                  setActiveCategory(cat.name); // comparing by name here
                  setVisibleCount(6);
                }}
                className={`rbt-btn bg-violet-opacity rbt-switch-btn`}
                style={{
                  textAlign: "left",
                  border: isActive ? "2px solid #800080" : "none",
                }}
              >
                <span data-text={cat.name}>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Blog Cards */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "10px 4px",
          }}
        >
          {filteredBlogs?.length > 0 ? (
            <>
              {filteredBlogs?.map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%", // Ensure full height for equal layout
                    backgroundColor: "#fff",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "3px solid #b966e721",
                    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(0,0,0,0.12)")
                  }
                  onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 1px 12px rgba(0,0,0,0.06)")
                  }
                >
                  <div style={{ flexGrow: 1 }}>
                    <Link href={`/blog/${card?.slug}`} target="_blank">
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          paddingBottom: "56%",
                          backgroundColor: "rgba(0,0,0,0.03)",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginBottom: "16px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          const img = e.currentTarget.querySelector("img");
                          if (img) img.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          const img = e.currentTarget.querySelector("img");
                          if (img) img.style.transform = "scale(1)";
                        }}
                      >
                        <Image
                          src={card?.thumbnailUrl || "/placeholder.jpg"}
                          alt="Blog Image"
                          fill
                          style={{
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                    </Link>

                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {new Date(card?.publishedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#800080",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {card.categories.map((val) => val.name)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "8px",
                      }}
                    >
                      {card.tags.map((val, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#6B7280",
                            backgroundColor: "#F3F4F6",
                            padding: "4px 8px",
                            border: "1px solid gray",
                            borderRadius: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {val.name}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${card?.slug}`}>
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#1F2937",
                          marginBottom: "8px",
                          lineHeight: "1.4",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {card.title}
                      </h3>
                    </Link>

                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#9CA3AF",
                        marginTop: "0px",
                        marginBottom: "8px",
                        lineHeight: "1.4",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {card.shortDescription.slice(0, 100)}..
                    </p>
                  </div>

                  {/* Footer always pinned to bottom */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "13px",
                      color: "#4B5563",
                      marginTop: "12px",
                    }}
                  >
                    <Link href={`/author/${card?.author._id}`}>
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        By {card.author.fullname}
                      </span>
                    </Link>

                    {card.status === "PUBLISHED" &&
                      card.isPublished &&
                      (card.approvalActionedBy.accountType ===
                        "CONTENT_APPROVER" ||
                        card.approvalActionedBy.accountType === "ADMIN") &&
                      (card.approvalActionedBy.email ===
                        "shashank.iiceindia@gmail.com" || card.approvalActionedBy.email ===
                        "karthik.vidyarishi@gmail.com") && (
                        // card.approvalActionedBy.email === "shashank.vidyarishi@gmail.com"
                        <span
                          style={{
                            color: "green",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <MdOutlineVerified /> Verified
                        </span>
                      )}
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              {/* {filteredBlogs.length > visibleCount && (
                <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  <button
                    onClick={handleLoadMore}
                    style={{
                      marginTop: "20px",
                      padding: "10px 20px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "#800080",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )} */}
            </>
          ) : (
            <div
              style={{
                padding: "12px",
                color: "#9CA3AF",
                fontStyle: "italic",
                fontSize: "14px",
              }}
            >
              Categories not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VidyaBlogCategoryList;
