"use client";
import { useScreenSize } from "@/hooks/screenSize";

const BlogPost = ({ data }) => {
  const screenSize = useScreenSize();

  // Responsive typography and padding
  const getResponsiveStyle = () => {
    switch (screenSize) {
      case "xs":
      case "sm":
        return { fontSize: "14px", lineHeight: "1.7", padding: "0.75rem" };
      case "md":
        return { fontSize: "15px", lineHeight: "1.8", padding: "1rem" };
      default:
        return { fontSize: "16px", lineHeight: "1.9", padding: "1.5rem" };
    }
  };

  return (
    <section
      style={{
        margin: "0 auto",
        textAlign: "justify",
        order: 1,
        overflow: "hidden",
        boxSizing: "border-box",
        wordWrap: "break-word",
        whiteSpace: "normal",
        textAlign: "justify",
        color: "#222",
        ...getResponsiveStyle(),
      }}
    >
      <span
        style={{
          maxWidth: "100%",
          display: "block",
        }}
        dangerouslySetInnerHTML={{
          __html: data?.content || "",
        }}
      />

      {/* Fix media and long text layout */}
      <style jsx>{`
        section * {
          max-width: 100% !important;
          box-sizing: border-box !important;
          overflow-wrap: break-word !important;
          word-break: break-word !important;
        }

        section img,
        section video,
        section iframe {
          display: block;
          max-width: 100% !important;
          height: auto !important;
          margin: 1rem auto;
          border-radius: 6px;
        }

        section p {
          margin: 0 0 1rem 0;
        }

        section table {
          width: 100% !important;
          border-collapse: collapse;
          margin: 1.5rem 0;
          display: block;
          overflow-x: auto; /* ✅ makes wide tables scrollable on mobile */
        }

        section th,
        section td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }

        section pre,
        section code {
          max-width: 100% !important;
          overflow-x: auto !important;
          display: block;
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 6px;
        }

        section blockquote {
          margin: 1.5rem 0;
          padding: 1rem 1.25rem;
          border-left: 4px solid #800080;
          background: #f9f5fc;
          font-style: italic;
          color: #333;
        }

        @media (max-width: 768px) {
          section {
            font-size: 14px !important;
            line-height: 1.7 !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogPost;
