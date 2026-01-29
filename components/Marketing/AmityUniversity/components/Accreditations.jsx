import React from "react";

const recognitions = [
  {
    title: "UGC Recognized",
    desc: "Approved by the University Grants Commission (UGC) for offering online degree programs.",
    logo: "/images/Marketing//img/ugc.png",
  },
  {
    title: "NAAC Accredited",
    desc: "Amity is accredited by NAAC with an ‘A+’ grade, reflecting academic excellence.",
    logo: "/images/Marketing//img/naac.png",
  },
  {
    title: "AICTE Approved",
    desc: "Amity University Online is approved by the All India Council for Technical Education (AICTE).",
    logo: "/images/Marketing//img/aicte.png",
  },
  {
    title: "WES Accredited",
    desc: "Recognized by World Education Services (WES) for global acceptance of degrees.",
    logo: "/images/Marketing//img/wes.png",
  },
  {
    title: "AIU Recognized",
    desc: "Degrees awarded by Amity University Online are recognized by the Association of Indian Universities (AIU), ensuring global acceptability.",
    logo: "/images/Marketing//img/aiu.png",
  },
  {
    title: "NIRF Ranked",
    desc: "Amity University is ranked among the top universities in India according to the National Institutional Ranking Framework (NIRF).",
    logo: "/images/Marketing//img/nirf.png",
  },
];

const Accreditations = () => {
  return (
    <section className="accreditations-section">
      <div className="accreditations-container">
        {/* Heading */}
        <h3 className="accreditations-heading">
          Accreditations & Recognitions
        </h3>

        {/* Recognition Cards */}
        <div className="accreditations-grid">
          {recognitions.map((item, idx) => (
            <div key={idx} className="accreditation-card">
              {/* Logo */}
              <img
                src={item.logo}
                alt={item.title}
                className="accreditation-logo"
              />

              {/* Title */}
              <h4 className="accreditation-title">{item.title}</h4>

              {/* Description */}
              <p className="accreditation-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;
