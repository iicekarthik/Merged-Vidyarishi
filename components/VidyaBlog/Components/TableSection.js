// Utility to generate ID
const generateId = (str) =>
  str
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-");

export const TableSection = ({ content }) => {
  const Id = generateId(content?.title);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        id={Id}
        dangerouslySetInnerHTML={{ __html: `${content.title}` }}
        style={{ fontSize: "24px", margin: "0", color: "black" }}
      ></h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate", // Change to 'separate' to allow individual border-radius on cells
          borderSpacing: "0", // Removes space between cells
          margin: "20px 0",
          fontSize: "18px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderTopLeftRadius: "12px", // Adjusted border-radius
                backgroundColor: "#f2f2f2", // Optional for header styling
                fontSize: "18px",
              }}
            >
              Feature
            </th>
            <th
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderTopRightRadius: "12px", // Adjusted border-radius
                backgroundColor: "#f2f2f2", // Optional for header styling
                fontSize: "18px",
              }}
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(content.data).map(([key, value], index) => (
            <tr key={index}>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderBottomLeftRadius:
                    index === Object.entries(content.data).length - 1
                      ? "12px"
                      : "0", // Optional for rounded bottom-left corner on last row
                  // backgroundColor: "#f9f9f9", // Optional for body rows styling
                }}
              >
                {key}
              </td>
              <td
                dangerouslySetInnerHTML={{ __html: `${value}` }}
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  borderBottomRightRadius:
                    index === Object.entries(content.data).length - 1
                      ? "12px"
                      : "0", // Optional for rounded bottom-right corner on last row
                  // backgroundColor: "#f9f9f9", // Optional for body rows styling
                }}
              ></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
