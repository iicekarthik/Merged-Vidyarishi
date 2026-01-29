import React from "react";
import Image from "next/image";

const DynamicImage = ({
  src,
  alt = "Dynamic Image",
  width,
  height,
  onclick,
  isShadow,
}) => {
  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        layout="intrinsic" // Auto width & height
        width={width ? width : "50"} // Dynamically passed width
        height={height ? height : "50"} // Dynamically passed height
        style={{
          borderRadius: "2px",
          cursor: "pointer",
          boxShadow: isShadow ? "6px 6px 20px 12px lightgray" : "none",
          objectFit: "contain",
        }}
        onClick={onclick}
        priority
        unoptimized
      />
    </div>
  );
};

export default DynamicImage;
