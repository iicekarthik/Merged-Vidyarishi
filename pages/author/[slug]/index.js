import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageHead from "@/pages/Head";
import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";
import Context from "@/context/Context";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const AuthorSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [author, setAuthor] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null > null);
  const [loading, setLoading] = useState(true);

  const fetchAuthorAndBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_BLOG_ROUTE}/user/author/${slug}`
      );
      setAuthor(response?.data?.user || null);
      setBlogs(response?.data?.blogs || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching author and blogs:", err);
      setError("Unable to load author profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchAuthorAndBlogs();
  }, [slug]);

  const getSocialIcon = (url) => {
    if (url.includes("instagram.com"))
      return <FaInstagram className="w-5 h-5" />;
    if (url.includes("linkedin.com")) return <FaLinkedin className="w-5 h-5" />;
    if (url.includes("twitter.com")) return <FaTwitter className="w-5 h-5" />;
    if (url.includes("github.com")) return <FaGithub className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <>
      <PageHead
        key={author?._id}
        title={`${author?.fullname || "Author"} | Vidyarishi`}
        description={author?.bio || "Author on Vidyarishi"}
        keywords={`Vidyarishi, blogs, author, ${author?.fullname}`}
        url={`/author/${slug}`}
      />

      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />

          <div
            style={{
              background: "linear-gradient(to top, white, white, #9e34eb)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "1.5rem",
                justifyContent: "start",
                alignItems: "flex-start",
                color: "white",
                padding: "1.2rem 0rem 0rem 2rem",
              }}
            >
              <Link href="/">Home </Link>
              &nbsp; {" > "} &nbsp;
              <Link href={`/author/${author?._id}`}>
                author {">"} {author?.fullname}
              </Link>
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row", // ✅ row by default
                justifyContent: "center",
                alignItems: "flex-start",
                // background: "linear-gradient(to top, white, white, #9e34eb)",
                padding: "1rem 1rem 4rem 1rem",
                gap: "2rem", // modern spacing
                //   marginLeft: "auto",
                //   marginRight: "auto",
              }}
            >
              {/* Author Profile Card */}
              <div
                style={{
                  background: "white",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                  borderRadius: "1rem",
                  flex: "1 1 320px",
                  maxWidth: "400px",
                  width: "100%",
                  padding: "2rem",
                  textAlign: "center",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "10rem",
                    height: "10rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "#e5e7eb",
                    margin: "0 auto 1rem",
                  }}
                >
                  {author?.avatarUrl && (
                    <Image
                      src={author.avatarUrl}
                      alt="Author Image"
                      fill
                      objectFit="cover"
                    />
                  )}
                </div>

                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {author?.fullname}
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {author?.bio}
                </p>

                <div
                  style={{
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <h5
                    style={{
                      color: "#374151",
                      fontWeight: 500,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Domain:
                  </h5>
                  <p style={{ color: "#4b5563", fontSize: "1.5rem" }}>
                    Vidyarishi
                  </p>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h5
                    style={{
                      color: "#374151",
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Social Media:
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "0.5rem",
                      marginTop: "10px",
                    }}
                  >
                    {author?.social?.map((platform) => (
                      <Link
                        href={`${platform}`}
                        target="_blank"
                        key={platform}
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "1.5rem",
                          border: "1px solid #d1d5db",
                        }}
                      >
                        {getSocialIcon(platform)}
                      </Link>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "1.5rem",
                    //   color: "#9ca3af",
                    marginBottom: "1rem",
                    marginTop: "20px",
                  }}
                >
                  Associated with Vidyarishi since :{" "}
                  <span style={{ fontWeight: 500, color: "#4b5563" }}>
                    {new Date(author?.createdAt).getMonth() +
                      "/" +
                      new Date(author?.createdAt).getFullYear()}
                  </span>
                </p>
              </div>

              {/* Blogs Section */}
              <div
                style={{
                  background: "white",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                  borderRadius: "1rem",
                  flex: "2 1 600px",
                  maxWidth: "980px",
                  width: "100%",
                  padding: "2rem",
                  textAlign: "left",
                  border: "1px solid #e5e7eb",
                }}
              >
                <h3
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 600,
                    color: "#1f2937",
                    marginBottom: "1rem",
                  }}
                >
                  Blogs by {author?.fullname}
                </h3>

                {loading && <p>Loading blogs...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && blogs?.length === 0 && (
                  <p>No blogs found.</p>
                )}

                {!loading && blogs?.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(260px, 1fr))",
                      gap: "1.5rem",
                      marginTop: "20px",
                    }}
                  >
                    {blogs.map((card) => (
                      <Link
                        href={`/blog/${card?.slug}`}
                        key={card._id}
                        style={{
                          background: "#ffffff",
                          borderRadius: "0.75rem",
                          border: "1px solid #e5e7eb",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                          textDecoration: "none",
                          color: "inherit",
                          transition:
                            "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 20px rgba(0,0,0,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 1px 6px rgba(0,0,0,0.06)";
                        }}
                      >
                        {/* Image */}
                        <div
                          style={{
                            position: "relative",
                            paddingBottom: "56%",
                            width: "100%",
                          }}
                        >
                          <Image
                            src={card?.thumbnailUrl || "/placeholder.jpg"}
                            alt="Blog Image"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>

                        {/* Content */}
                        <div style={{ padding: "1rem", flex: "1" }}>
                          <p
                            style={{
                              fontSize: "1.1rem",
                              color: "#9ca3af",
                              marginBottom: "0.25rem",
                              textTransform: "uppercase",
                              fontWeight: 500,
                            }}
                          >
                            {new Date(card?.publishedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 600,
                              color: "#800080",
                              marginBottom: "0.25rem",
                              textTransform: "uppercase",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {card?.categories
                              ?.map((val) => val.name)
                              .join(", ")}
                          </p>

                          <h3
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 600,
                              color: "#1f2937",
                              marginBottom: "0.5rem",
                              lineHeight: "1.4",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {card.title}
                          </h3>

                          <p
                            style={{
                              fontSize: "1.1rem",
                              color: "#6b7280",
                              marginBottom: "0.75rem",
                              lineHeight: "1.4",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {card.shortDescription?.slice(0, 100)}...
                          </p>

                          {/* Tags */}
                          {/* <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.4rem",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {card?.tags?.map((tag) => (
                            <span
                              key={tag.name}
                              style={{
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "#6b7280",
                                background: "#f3f4f6",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "9999px",
                                border: "1px solid #d1d5db",
                                textTransform: "uppercase",
                              }}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div> */}

                          {/* Footer */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "1.2rem",
                              color: "#4b5563",
                            }}
                          >
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              By {card.author?.fullname}
                            </span>

                            {card.status === "PUBLISHED" &&
                              card.isPublished && (
                                <span
                                  style={{
                                    color: "green",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    whiteSpace: "nowrap",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Verified
                                </span>
                              )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default AuthorSlug;
