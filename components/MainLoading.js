import Image from "next/image";
import React from "react";
import Logo from "../public/images/vidya/logo/VR_logo.png";

const MainLoading = () => {
  const containerStyle = {
    height: "100vh",
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  };

  const headerStyle = {
    margin: "0.25rem 0",
    fontSize: "2.5rem",
    animation: "drop-in 1s ease 200ms backwards",
  };

  const paragraphStyle = {
    margin: "0.5rem 0",
    fontSize: "22px",
    animation: "drop-in 1.2s ease 500ms backwards",
  };

  return (
    <>
      <style>
        {`
          @keyframes drop-in {
            from {
              opacity: 0;
              transform: translateY(-100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={{ overflow: "hidden" }}>
          {/* <h1 style={headerStyle}>Welcome To</h1> */}
          <Image alt="Image Not Available" style={headerStyle} src={Logo} width={300} height={100} />
        </div>
        <div style={{ overflow: "hidden" }}>
          <p style={paragraphStyle}></p> 
        </div>
      </div>
    </>
  );
};

export default MainLoading;
