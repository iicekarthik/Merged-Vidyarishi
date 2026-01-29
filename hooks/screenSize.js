import { useState, useEffect } from "react";

const getScreenSize = () => {
  if (typeof window === "undefined") return "xs"; 

  const width = typeof window !== "undefined" ? window.innerWidth : "xs";


  if (width >= 1536) return "xxl"; // Tailwind: 2xl
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
};

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("xxl");

  useEffect(() => {
    setScreenSize(getScreenSize()); // Update after hydration

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
