import { useState } from "react";

const FAQ = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faq?.items || faq.items.length === 0) return null;

  return (
    <div style={{ marginTop: "60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>
        {faq.title || "FAQs | Frequently Asked Questions"}
      </h2>

      {faq.items.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #e5e8f3",
            borderRadius: "6px",
            marginBottom: "14px",
            background: "#fff",
          }}
        >
          {/* Question */}
          <div
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#eef2ff",
                  color: "#3b5cff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                ?
              </span>

              <h4
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                {item.q}
              </h4>
            </div>

            <span
              style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#3b5cff",
              }}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          {/* Answer */}
          {openIndex === index && (
            <div
              style={{
                padding: "0 20px 18px 54px",
                fontSize: "15px",
                lineHeight: "1.7",
                color: "#475569",
              }}
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
