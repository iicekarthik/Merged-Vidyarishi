import React from "react";


const AmityStatsAndHighlights = () => {
  const highlights = [
    {
      title: "Emerging\nSpecializations",
      desc:
        "New-age specializations\nshaping tomorrow's business\nlandscape",
      img: "/images/Marketing//highlights/specialization.png",
      alt: "Emerging Specializations",
    },
    {
      title: "Robust\nLearning\nModel",
      desc:
        "550+ hours of video lectures\nto help you maximize\nyour learning",
      img: "/images/Marketing//highlights/learningmodel.png",
      alt: "Robust Learning Model",
    },
    {
      title: "Personalized\nLearning",
      desc:
        "Personalized learning through\nunique option of choice based\ncredit system",
      img: "/images/Marketing//highlights/learning.png",
      alt: "Personalized Learning",
    },
    {
      title: "Real World\nProjects",
      desc:
        "Real world projects & case\nstudies to help you succeed in\nyour domain",
      img: "/images/Marketing//highlights/project.png",
      alt: "Real World Projects",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-box yellow">
            <div className="stat-number">30+</div>
            <div className="stat-label">Years Of Excellence</div>
          </div>
          <div className="stat-box green">
            <div className="stat-number white">60+</div>
            <div className="stat-label dark">Programs &amp; Specializations</div>
          </div>
          <div className="stat-box blue">
            <div className="stat-number white">1.60 Lac+</div>
            <div className="stat-label dark">Learners</div>
          </div>
          <div className="stat-box pink">
            <div className="stat-number white">3.5L+</div>
            <div className="stat-label dark">Strong Alumni Network</div>
          </div>
        </div>

        {/* Program Highlights */}
        <div className="highlights-box">
          <div className="highlights-header">
            <h2 className="highlights-title">
              Program Highlights And <br /> Advantages
            </h2>
            <p className="highlights-desc">
              Discover our Online Degree Programs and <br />
              begin an exciting educational journey
            </p>
          </div>

          <hr className="divider" />

          <div className="highlights-grid">
            {highlights.map((h, idx) => (
              <div
                key={h.alt}
                className={`highlight-item ${idx > 0 ? "with-border" : ""}`}
              >
                <img
                  src={h.img}
                  alt={h.alt}
                  className="highlight-img"
                  loading="lazy"
                />
                <h3 className="highlight-title">{h.title}</h3>
                <p className="highlight-text">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmityStatsAndHighlights;
