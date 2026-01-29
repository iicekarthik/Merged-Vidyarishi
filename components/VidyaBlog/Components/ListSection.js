// ListSection Component
// Utility to generate ID
const generateId = (str) =>
  str
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-");

export const ListSection = ({ content }) => {
  const Id = generateId(content?.title);

  return (
    <div>
      <h2
        id={Id}
        dangerouslySetInnerHTML={{ __html: `${content.title}` }}
        style={{ fontSize: "24px", margin: "0", color: "black" }}
      ></h2>
      <ol
        className="custom-ol"
        style={{
          padding: "0px 30px",
          listStyleType: "decimal",
          color: "black",
        }}
      >
        {content.items.map((item, index) => (
          <li
            key={index}
            style={{
              // background: "#fff",
              padding: "4px 0",
              margin: "10px 0",
              // borderRadius: "8px",
              // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h6
              dangerouslySetInnerHTML={{ __html: `${item.title}` }}
              style={{
                fontSize: "20px",
                margin: "0",
                color: "black",
                lineHeight: "1.6",
              }}
            ></h6>
            <p
              dangerouslySetInnerHTML={{
                __html: `${item.description}`,
              }}
              style={{ fontSize: "18px", color: "black", lineHeight: "1.6" }}
            ></p>
          </li>
        ))}
      </ol>
    </div>
  );
};
