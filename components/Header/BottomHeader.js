import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaHeadset } from "react-icons/fa";
import { useAppContext } from "@/context/Context";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { LiaHeadsetSolid } from "react-icons/lia";

const BottomHeader = ({ screenSize }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScreenReady, setIsScreenReady] = useState(false);
  const { isOpen, setIsOpen } = useAppContext();
  const AcrossScreen = ["xxl", "xl", "lg"].includes(screenSize);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = ["xxl", "xl", "lg"].includes(screenSize) ? 400 : 700;
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [screenSize]);

  useEffect(() => {
    // Screen size update hone ke baad state set karo
    if (AcrossScreen) {
      // console.log(AcrossScreen)
      setIsScreenReady(true);
    }
  }, [AcrossScreen]);

  // if (["xxl", "xl", "lg"].includes(screenSize)) return null;
  
  // if (isScreenReady) return null;

  const navItems = [
    {
      NavName: "Compare",
      NavLink: "UniversityEmi",
      icon: <MdCompareArrows size={24} />,
      Link: "compare-university",
    },
    {
      NavName: "Enquiry",
      NavLink: "UniversityCourse",
      icon: <LiaHeadsetSolid size={26} />,
      Bool: true,
    },
    {
      NavName: "WhatsApp",
      NavLink: "UniversityApprovals",
      icon: <FaWhatsapp size={24} />,
      Link: "https://wa.me/919619535535",
    },
    {
      NavName: "Call",
      NavLink: "UniversityAbout",
      icon: <IoCallOutline size={24} />,
      Link: "tel:+919619535535",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 111,
        padding: "10px 0",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        transition: "top 0.3s ease-in-out",
        boxShadow: isSticky ? "0px -2px 10px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          minWidth: "280px",
          padding: "0 20px",
          margin: 0,
          gap: "5px",
        }}
      >
        {navItems.map((item, index) => (
          <li
            key={index}
            style={{
              fontSize: "12px", // Font size applied globally
              cursor: "pointer",
              borderRadius: "5px",
              textAlign: "center",
              minWidth: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.Bool ? (
              <button
                onClick={() => setIsOpen(true)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: activeSection === item.NavLink ? "#000000" : "#000000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontWeight: "bold",
                  fontSize: "12px", // Consistent font size
                }}
              >
                <div style={{ fontSize: "18px" }}>{item.icon}</div>
                <div>{item.NavName}</div>
              </button>
            ) : (
              <Link
                href={item.Link || "#"}
                style={{
                  fontWeight: "bold",
                  color: activeSection === item.NavLink ? "#000000" : "#000000",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "12px", // Uniform font size
                }}
              >
                <div style={{ fontSize: "18px" }}>{item.icon}</div>
                <div>{item.NavName}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomHeader;
