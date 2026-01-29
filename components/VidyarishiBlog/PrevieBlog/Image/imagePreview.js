import React from "react";
// import OnlineMba from "@/images/vidya/homeSlide1/online_mba.png";

const ImagePreview = ({ data }) => {
  //   console.log(data?.fields?.media); // This still logs your media field if needed

  return (
    <div>
      <img
        src={data && `/images/vidya/homeSlide1/online_mba.png`}
        width={"100%"}
        height={"100%"}
        style={{ marginBottom: "15px" }}
        alt="Image Preview"
      />
      {/* <p>Media ID: {data?.fields?.media}</p> */}
      {/* You can add an image tag or preview based on your data */}
    </div>
  );
};

export default ImagePreview;
