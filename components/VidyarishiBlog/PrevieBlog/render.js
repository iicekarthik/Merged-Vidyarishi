import React from "react";
import JsonToTableClient from "./JsonToTable/JsonToTableClient";
import Code from "./Code/Code";
import DropBlockClient from "./DropBlock/DropBlockClient";
import ListClient from "./List/ListClient";
import Link from "next/link";
import { TableOfContent } from "./TableOfContent/TableOfContent";
import ImagePreview from "./Image/imagePreview";

const Render = ({ ArrayData }) => {
  if (!ArrayData) return null;

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // remove non-word characters
      .trim()
      .replace(/\s+/g, "-"); // replace spaces with dashes

  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "column",
        padding: "10px 20px",
        color: "black",
      }}
    >
      {ArrayData?.content?.root?.children?.map((value, index) => {
        switch (value?.type) {
          case "paragraph":
            return (
              <p key={index}>
                {value?.children?.map((child, childIndex) => {
                  if (child?.type === "text") {
                    const style = {
                      textAlign:
                        value?.direction === "ltr"
                          ? "left"
                          : value?.direction === "rtr"
                          ? "right"
                          : "center",
                      fontWeight: child?.mode === "bold" ? "bold" : "normal",
                      textDecoration:
                        child?.mode === "underline" ? "underline" : "none",
                      fontStyle: child?.mode === "italic" ? "italic" : "normal",
                    };
                    return (
                      <span key={childIndex} style={style}>
                        {child?.text}
                      </span>
                    );
                  } else if (child?.type === "link") {
                    return (
                      <Link
                        href={child?.fields?.url}
                        key={childIndex}
                        style={{ color: "blue" }}
                      >
                        {child?.children?.map((data) => data?.text)}
                      </Link>
                    );
                  }
                  return null;
                })}
              </p>
            );
          case "block":
            switch (value?.fields?.blockType) {
              case "dropBlock":
                return (
                  <div key={index}>
                    <DropBlockClient data={value} />
                  </div>
                );
              case "jsonToTableBlock":
                return (
                  <div key={index}>
                    <JsonToTableClient key={index} data={value} />
                  </div>
                );
              case "mediaBlock":
                return (
                  <div key={index}>
                    <ImagePreview key={index} data={value} />
                  </div>
                );
            }
          case "list":
            return <ListClient key={index} data={value} />;
          case "code":
            return (
              <Code
                key={index}
                code={value?.content}
                language={value?.language}
              />
            );
          case "heading":
            return (
              <h1
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  margin: "3.5rem 0 1rem 0 ",
                }}
                key={index}
              >
                {value?.children?.map((child, childIndex) => (
                  <span
                    id={`#${slugify(child.text)}`}
                    key={childIndex}
                    // style={{
                    //   fontWeight: child?.mode === "bold" ? "bold" : "normal",
                    //   textDecoration:
                    //     child?.mode === "underline" ? "underline" : "none",
                    //   fontStyle: child?.mode === "italic" ? "italic" : "normal",
                    // }}
                  >
                    {child?.text}
                  </span>
                ))}
              </h1>
            );
          default:
            return <span key={index}>{value?.type}Vidyarishi.com</span>;
        }
      })}
    </div>
  );
};

export default Render;
