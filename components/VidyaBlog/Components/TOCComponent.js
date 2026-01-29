import { useScreenSize } from "@/hooks/screenSize";
import React, { useEffect, useState } from "react";

// Utility to generate ID
const generateId = (str) =>
  str
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "")
    ?.replace(/\s+/g, "-");

export const BlogTableOfContent = ({ slug, post, title }) => {
  const id = generateId(title);

  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = BigScreenLogic ? 400 : 600;
      setIsSticky(window.scrollY > threshold);

      let currentSection = "";
      const sections = [
        { title: "Introduction", id: "introduction" },
        ...(post?.sections?.map((s) => ({
          title: s.title,
          id: generateId(s.title),
        })) || []),
      ];

      sections.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = item.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [screenSize, BigScreenLogic, post]);

  const scrollToSection = (id, offset = 80) => {
    // console.log("scrollToSection", id, offset);
    const element = document.getElementById(id);
    if (element) {
      requestAnimationFrame(() => {
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });

        setTimeout(() => {
          setActiveSection(id);
        }, 500);
      });
    }
  };

  return (
    <button
      onClick={() => scrollToSection(id, 180)}
      style={{
        border: "none",
        background: "none",
        textAlign: "left",
        cursor: "pointer",
        display: "block",
        padding: "8px 16px",
        fontSize: "14px",
        color: activeSection === id ? "#6366F1" : "#4B5563",
        textDecoration: "none",
        transition: "color 0.2s ease-in-out",
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = "#6366F1")}
      onMouseOut={(e) =>
        (e.currentTarget.style.color =
          activeSection === id ? "#6366F1" : "#4B5563")
      }
    >
      • <span dangerouslySetInnerHTML={{ __html: `${title}` }}></span>
    </button>
  );
};
