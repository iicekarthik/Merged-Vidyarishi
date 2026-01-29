import React from "react";
import List from "./List/List";
import Table from "../TableClient/Table";
import JsonToTable from "./JsonToTable/JsonToTable";
import Code from "./Code/Code";
import BannerBlock from "./BannerBlock/BannerBlock";
import Render from "./render";

const convertTimestampToDate = (timestamp) => {
  if (!timestamp) return "Invalid Date";

  const date = new Date(timestamp); // Works for ISO strings or timestamps

  if (isNaN(date.getTime())) return "Invalid Date";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }); // Apr, May, etc.
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

const PreviewBlog = ({ Posts }) => {
  // Utility: Convert Unix timestamp to readable date

  return (
    <>
      {Posts?.filter((post) => post?._status === "published")?.map(
        (post, index) => {
          const publishedDate = convertTimestampToDate(post?.publishedAt);

          return (
            <div key={index} style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "1.3em", marginBottom: "1rem" }}>
                {post?.title}
              </h1>

              <div
                style={{
                  fontSize: "0.9em",
                  marginBottom: "0.5rem",
                  color: "#000",
                }}
              >
                Published At: {publishedDate}
              </div>

              {post?.slugLock && <Render ArrayData={post} />}
            </div>
          );
        }
      )}
    </>
  );
};

export default PreviewBlog;
