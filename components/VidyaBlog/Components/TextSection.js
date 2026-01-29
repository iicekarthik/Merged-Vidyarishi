import React from "react";

// Utility to generate ID
const generateId = (str) =>
  str
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-");

export const TextSection = ({ content }) => {
  const Id = generateId(content?.title);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        id={Id}
        dangerouslySetInnerHTML={{ __html: `${content.title}` }}
        style={{
          fontSize: "24px",
          margin: "0",
          color: "black",
        }}
      ></h2>
      <section style={{ marginBottom: "20px", marginTop: "20px" }}>
        <p
          dangerouslySetInnerHTML={{ __html: `${content.content}` }}
          style={{
            fontSize: "18px",
            color: "black",
            lineHeight: "1.6",
          }}
        ></p>
      </section>
    </div>
  );
};
