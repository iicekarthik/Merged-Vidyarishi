import Link from "next/link";
import React from "react";
import University from "@/data/vidya/University.json";
import { useRouter } from "next/navigation";
import { useScreenSize } from "@/hooks/screenSize";

const TopUniversities = ({ post }) => {
  const ScreenSize = useScreenSize();
  const router = useRouter();
  const categories = post?.categories?.map((cat) => cat.name) || [];

  //  Dynamically get unique shortNames from all universities
  const uniqueShortNames = [];

  University.AllUniversities.forEach((uni) => {
    uni.courses.forEach((course) => {
      const shortName = course.shortName?.trim();
      if (!shortName) return;
      if (!uniqueShortNames.includes(shortName)) {
        uniqueShortNames.push(shortName);
      }
    });
  });

  // console.log("All unique shortNames:", uniqueShortNames);

  // Find a category from post.categories that matches a shortName
  const matchedShortName = categories.find((cat) =>
    uniqueShortNames.includes(cat)
  );

  const filteredUniversities = matchedShortName
    ? University.AllUniversities.filter((uni) =>
        uni.courses.some(
          (course) => course.shortName?.trim() === matchedShortName
        )
      )
    : University.AllUniversities;

  const handleExploreMore = () => {
    if (matchedShortName) {
      router.push({
        pathname: "/all-courses",
        query: { shortName: matchedShortName },
      });
    } else {
      router.push("/all-courses");
    }
  };

  return (
    <div className="ml--20">
      <h5 className="mt--10">Universities</h5>

      <div
        style={{
          display: "flex",
          flexDirection:
            ScreenSize === "xs" || ScreenSize === "sm" ? "row" : "column",
          // width: ScreenSize === "xs" || ScreenSize === "sm" ? "100%" : "auto",
          overflow: "auto",
          alignItems: "center",
          gap: "16px",
          marginTop: "16px",
          marginBottom: "20px",
          flexWrap:
            ScreenSize === "xs" || ScreenSize === "sm" ? "nowrap" : "wrap",
        }}
      >
        {filteredUniversities.length > 0 ? (
          <>
            {filteredUniversities.slice(0, 10).map((uni) => (
              <div
                key={uni.id}
                style={{
                  margin: "0px 14px",
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
                    ScreenSize === "xs" || ScreenSize === "sm"
                      ? "180px"
                      : "280px",
                  maxWidth: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Distribute image + content
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <Link href={`/${uni.link}`} style={{ textDecoration: "none" }}>
                  <div>
                    <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                      <img
                        src={uni.buildingImage || "/default-blog.jpg"}
                        width="100%"
                        height="auto"
                        style={{
                          maxHeight: "160px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          transition: "transform 0.3s ease",
                        }}
                        alt={uni.title}
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
                        fontSize: "1.2rem",
                        margin: "10px 6px 6px",
                        color: "#333",
                        fontWeight: "600",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {uni.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "0 6px 4px",
                        color: "#000",
                        fontWeight: "600",
                      }}
                    >
                      {uni.location}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        margin: "6px",
                        color: "#555",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.6",
                        height: "72px", // lock the height for description block
                      }}
                    >
                      {uni.shortDescription}
                    </p>
                  </div>
                </Link>
              </div>
            ))}

            {filteredUniversities.length > 10 && (
              <button onClick={handleExploreMore} className="rbt-btn3 mt-4">
                Explore More
              </button>
            )}
          </>
        ) : (
          <p>No universities available.</p>
        )}
      </div>
    </div>
  );
};

export default TopUniversities;
