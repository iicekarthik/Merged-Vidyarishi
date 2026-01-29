// components/TableOfContentClient.jsx
import { useScreenSize } from "@/hooks/screenSize";
import React, { useEffect } from "react";
import { useState } from "react";
// import './TableOfContent.scss'

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with dashes

export const TableOfContentClient = ({ data }) => {
  if (!data || !data.items?.length) return null;

  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = BigScreenLogic ? 400 : 600;
      setIsSticky(window.scrollY > threshold);

      // Jo section currently viewport me hai, usko active set karo
      let currentSection = "";
      data?.items?.map((item) => {
        const element = document.getElementById(item.link);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentSection = item.link;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [screenSize, BigScreenLogic]);


  const scrollToSection = (id, offset = 80) => {
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
    <div className="table-of-content">
      <h5>
        <b>{data.title}</b>
      </h5>
      <ul className="toc-list">
        {data?.items.map((item, i) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection(`#${slugify(item.link)}`, 180)}
            key={i}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
