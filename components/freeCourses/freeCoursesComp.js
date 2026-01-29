import React from "react";

const freeCoursesComp = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        backgroundColor: "#ffff",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            margin: "150px 0 20px 0",
          }}
        >
          Free Courses
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#7f8c8d",
            fontSize: "18px",
            margin: "10px 0",
          }}
        >
          Coming Soon...
        </p>

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            fontSize: "16px",
            color: "#2c3e50",
          }}
        >
          <p>
            We are working on exciting new Courses. Stay tuned for
            updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default freeCoursesComp;
