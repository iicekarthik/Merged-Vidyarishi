import Image from "next/image";
import React from "react";

const Faculty = ({ university }) => {
  return (
    <div id="UniversityFaculty" style={{ padding: "60px" }}>
      <div>
        <h5>
          Faculty Of{" "}
          <span style={{ color: "purple" }}> {university?.title}</span>{" "}
        </h5>
      </div>

      <div style={{ padding: "40px 60px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {university?.Faculty?.map((data, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 auto",
                width: "18%",
                maxWidth: "180px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: "15px",
                textAlign: "center",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  width={80}
                  height={80}
                  style={{
                    boxShadow: "4px 4px 10px gray",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                  src={data?.Image}
                  alt={data?.Name}
                />
                <h6 style={{ margin: "10px 0 5px 0"}}>
                  {data?.Name}
                </h6>
                <button
                  style={{
                    background: "#6200ea",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px",
                    fontSize: "1.3rem",
                  }}
                >
                  Learn More <i className="feather-arrow-right" ></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
