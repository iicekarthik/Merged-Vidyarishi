import React from "react";

const Blog = ({ university }) => {
  return (
    <div id="UniversityBlog" 
    // style={{ padding: "60px 60px 0px 60px" }}
     className="px-5 pt--60"
    >
      {/* <div>
        <h5>
          Blog Of <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div> */}

      <div className="d-flex justify-content-start gap-2">
        <h5 className="mb-2"> Blog Of {university?.title}</h5>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "nowrap",
            // overflowX: "auto",
            padding: "10px",
            textAlign: "center",
          }}
           className="flex-column flex-xxl-row flex-xl-row flex-md-row"
        >
          {["BLOG Comming Soon", "BLOG Comming Soon", "BLOG Comming Soon"]?.map(
            (data, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto", // 🚀 Prevent shrinking, fixed size cards
                  // width: "40%", // ✅ Each card takes 18% width
                  maxWidth: "600px", // 🔥 Responsive limit
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "1.7rem",
                      margin: "20px 0px 0px 0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      textAlign: "center",
                    }}
                  >
                    {data}
                  </h2>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
