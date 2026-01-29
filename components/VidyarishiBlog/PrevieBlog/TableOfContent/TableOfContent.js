// components/TableOfContent.jsx
import React from "react";
import { TableOfContentClient } from "./TableOfClient";
// import "./TableOfContent.scss";

export const TableOfContent = ({ className, title, content }) => {
  const items = content?.fields?.content?.map((entry) => entry.item);

  // console.log("content", content)

  return (
    <div className={`table-of-content-wrapper ${className || ""}`}>
      
    </div>
  );
};
