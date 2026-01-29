import React from "react";
import { TextSection } from "./TextSection";
import { TableSection } from "./TableSection";
import { ListSection } from "./ListSection";
import BlogFaq from "./BlogFaq";
import Image from "next/image";
import Link from "next/link";
import ResponsiveContent from "./ResponsiveContent";

const BlogPost = ({ data }) => {
  // Format published date
  const formattedDate = new Date(data?.publishedAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div
      style={{
        padding: "1rem",
        color: "#000",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Blog Title */}
      <header>
        <h1
          id={`${data?.title}`}
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            margin: "0",
            color: "#000",
            lineHeight: "1.3",
            fontWeight: 700,
            wordWrap: "break-word",
          }}
        >
          {data?.title}
        </h1>

        {/* Author & Meta Info */}
        <section
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {/* Author Info */}
          <Link
            href={`/author/${data?.author?._id}`}
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: "10px",
              color: "#000",
            }}
          >
            <Image
              src={data?.author?.avatarUrl}
              alt={data?.author?.fullname}
              width={35}
              height={35}
              style={{
                borderRadius: "50%",
                border: "1px solid lightgray",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {data?.author?.fullname}
            </span>
          </Link>

          {/* Published Info */}
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              color: "gray",
              lineHeight: "1.6",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <span>
              <strong>Published:</strong> {formattedDate}
            </span>
            <span>|</span>
            <span>{data?.read_min}</span>
            <span>|</span>
            <span
              style={{
                fontWeight: 600,
                color: "#800080",
                textTransform: "uppercase",
              }}
            >
              {data?.categories?.map((val) => val.name).join(", ")}
            </span>
          </p>
        </section>
      </header>

      {/* Separator */}
      <hr
        style={{
          border: "0.5px solid #e0e0e0",
          margin: "15px 0",
        }}
      />

      {/* Short Description */}
      {data?.shortDescription && (
        <section style={{ marginTop: "15px" }}>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#222",
              lineHeight: "1.7",
              textAlign: "justify",
            }}
          >
            {data.shortDescription}
          </p>
        </section>
      )}

      {/* Divider */}
      <hr
        style={{
          border: "0.5px solid #e0e0e0",
          margin: "20px 0",
        }}
      />

      {/* Thumbnail Image */}
      {data?.thumbnailUrl && (
        <section id="introduction">
          <Image
            src={data?.thumbnailUrl}
            alt={data?.title || "Blog Image"}
            width={1000}
            height={600}
            style={{
              width: "100%",
              height: "auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
              maxWidth: "100%",
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1000px"
          />
        </section>
      )}

      {/* Divider */}
      <hr
        style={{
          border: "0.5px solid #e0e0e0",
          margin: "20px 0",
        }}
      />

      {/* Main Blog Content */}
      <ResponsiveContent data={data} />
    </div>
  );
};

export default BlogPost;
