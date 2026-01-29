"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import light from "../../public/images/about/sun-01.svg";
import dark from "../../public/images/about/vector.svg";

const DarkSwitch = () => {
  const [isLightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    const themeType = localStorage.getItem("histudy-theme");
    if (themeType === "dark") {
      setLightTheme(false);
      document.body.classList.add("active-dark-mode");
    }
  }, []);

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("active-dark-mode");
      localStorage.setItem("histudy-theme", "light");
    } else {
      document.body.classList.add("active-dark-mode");
      localStorage.setItem("histudy-theme", "dark");
    }
  }, [isLightTheme]);

  const toggleTheme = () => {
    setLightTheme((prevTheme) => !prevTheme);
  };

  return (
    <div id="my_switcher" className="my_switcher">
      <ul onClick={toggleTheme}>
        {isLightTheme ? (
          <li>
            <button data-theme="light" className="setColor light">
              <Image src={dark} alt="Sun images" />
            </button>
          </li>
        ) : (
          <li>
            <button data-theme="dark" className="setColor dark">
              <Image src={light} alt="Vector Images" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DarkSwitch;
