
import React from "react";

const courses = [
  "BA General",
  "BA General Hindi Medium",
  "BA General Tamil",
  "BA General Telugu",
  "BA General Kannada",
  "BA General Malayalam",
  "BA Journalism and Mass Communication",
  "BBA General",
  "BBA Professional Certificate in Business Analytics",
  "BBA Data Analytics",
  "Bcom General",
  "Bcom Honours",
  "Bcom General Tamil",
  "Bcom General Telugu",
  "Bcom General Kannada",
  "Bcom General Hindi Medium",
  "Bcom International Finance & Accounting",
  "BCA General",
  "BCA Data Engineering",
  "BCA Software Engineering",
  "BCA Cloud Security",
  "BCA Data Analytics",
  "MA Journalism & Mass Communication",
  "MA Public Policy & Governance",
  "Mcom Finance and Marketing",
  "MBA General Management",
  "MBA Marketing and Sales Management",
  "MBA Entrepreneurship and Leadership Management",
  "MBA Financial & Accounting Management",
  "MBA Human Resource Management",
  "MBA Information Technology Management",
  "MBA International Business Management",
  "MBA Data Science",
  "MBA Retail Management",
  "MBA Global Finance Market",
  "MBA Hospitality Management",
  "MBA Insurance Management",
  "MBA Petroleum & Natural Gas Management",
  "MBA International Finance",
  "MBA Dual Specialization",
  "MCA General",
  "MCA Cybersecurity",
  "MCA Software Engineering",
  "MCA Augmented Reality and Virtual Reality",
  "MCA Machine Learning",
  "MSc Data Science",
];

// 
const generateLink = (course) => {
  const parts = course.split(" ");
  const degree = parts[0].toLowerCase();
  const slug = parts
    .slice(1)
    .join(" ")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "");
  return `https://vidyarishi.com/amity-university/${degree}/${slug}`;
};

const Footer = () => {
  const colSize = Math.ceil(courses.length / 3);
  const col1 = courses.slice(0, colSize);
  const col2 = courses.slice(colSize, 2 * colSize);
  const col3 = courses.slice(2 * colSize);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Column 1 */}
          <div>
            <h3>Courses</h3>
            <ul>
              {col1.map((course, index) => (
                <li key={index}>
                  <a href={generateLink(course)} target="_blank" rel="noopener noreferrer">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3></h3>
            <ul>
              {col2.map((course, index) => (
                <li key={index}>
                  <a href={generateLink(course)} target="_blank" rel="noopener noreferrer">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3></h3>
            <ul>
              {col3.map((course, index) => (
                <li key={index}>
                  <a href={generateLink(course)} target="_blank" rel="noopener noreferrer">
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3>Disclaimer</h3>
            <p>
              We act as a marketing service partner only. Amity University holds
              full rights to request change or removal of any non-relevant content.
              Images used are for illustrative purposes and do not directly represent
              the respective colleges or universities.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © 2025 <a href="https://vidyarishi.com/">vidyarishi.com</a> | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
