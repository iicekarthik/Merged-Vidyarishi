import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Utility to generate ID
const generateId = (str) =>
  str
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-");

export default function BlogFaq({ content }) {
  const Id = generateId(content?.title);

  // ✅ Declare the openIndex state
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // console.log("content", content);

  return (
    <div
      style={
        {
          // maxWidth: "700px",
          // margin: "40px auto",
          // padding: "20px",
          // backgroundColor: "#ffffff",
          // borderRadius: "16px",
          // boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          // fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }
      }
    >
      <h2
        Id={Id}
        dangerouslySetInnerHTML={{ __html: `${content.title}` }}
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "black",
          textAlign: "left",
          marginBottom: "24px",
        }}
      ></h2>

      {content?.questions?.map((faq, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            marginBottom: "16px",
            overflow: "hidden",
            transition: "all 0.3s ease",
            color: "black",
          }}
        >
          <button
            onClick={() => toggle(index)}
            style={{
              width: "100%",
              padding: "16px",
              background: "none",
              border: "none",
              textAlign: "left",
              fontWeight: 600,
              fontSize: "16px",
              color: "#34495e",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: `${faq?.question}`,
              }}
            ></span>
            <ChevronDown
              style={{
                width: "20px",
                height: "20px",
                transform: openIndex === index ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>

          {openIndex === index && (
            <div
              style={{
                padding: "0 16px 16px 16px",
                fontSize: "15px",
                color: "black",
                lineHeight: "1.6",
              }}
            >
              <div>
                <hr
                  style={{
                    border: "0.2px solid lightgray",
                    margin: "20px 0",
                  }}
                />
              </div>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${faq?.answer}`,
                }}
              ></span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
