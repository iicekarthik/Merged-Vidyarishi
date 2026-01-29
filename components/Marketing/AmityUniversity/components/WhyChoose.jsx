import React from "react";
import { FiMapPin, FiSmartphone } from "react-icons/fi";
import { FaRobot, FaCertificate, FaUserGraduate, FaUsers } from "react-icons/fa";
import { MdWork } from "react-icons/md";


const WhyChoose = () => {
  return (
    <section className="whychoose-section">
      <div className="whychoose-container">
        <h2 className="whychoose-heading">
          Why Choose Amity University Online?
        </h2>

        <div className="whychoose-grid">
          {/* Card 1 */}
          <div className="whychoose-card">
            <img src="/images/Marketing//img/wasc.png" alt="WASC" className="whychoose-img" />
            <h3 className="whychoose-title">WASC Accreditation (USA)</h3>
            <p className="whychoose-desc">
              Recognised by the Western Association of Schools and Colleges (WASC, USA), Amity Online aligns with world-class education benchmarks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="whychoose-card">
            <img src="/images/Marketing//img/wes.png" alt="WES" className="whychoose-img small" />
            <h3 className="whychoose-title">WES Recognition</h3>
            <p className="whychoose-desc">
              Amity Online degrees are accepted by WES in Canada and the USA, opening global opportunities for higher studies and careers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="whychoose-card">
            <img src="/images/Marketing//img/qs.png" alt="QS" className="whychoose-img small" />
            <h3 className="whychoose-title">QS Ranked Online MBA</h3>
            <p className="whychoose-desc">
              Amity’s Online MBA is among the top programs in Asia Pacific as per QS rankings, recognised for academic strength and learner success.
            </p>
          </div>

          {/* Card 4 */}
          <div className="whychoose-card">
            <img src="/images/Marketing//img/qaa.png" alt="QAA" className="whychoose-img tiny" />
            <h3 className="whychoose-title">QAA (UK) Accreditation</h3>
            <p className="whychoose-desc">
              Accredited by the Quality Assurance Agency (QAA), UK, ensuring globally recognised and trusted academic quality.
            </p>
          </div>

          {/* Card 5 */}
          <div className="whychoose-card">
            <img src="/images/Marketing//img/the.png" alt="Times Higher Education" className="whychoose-img tiny" />
            <h3 className="whychoose-title">Times Higher Education Rankings</h3>
            <p className="whychoose-desc">
              Featured in global Times Higher Education rankings for graduate employability and academic reputation.
            </p>
          </div>

          {/* Card 6 */}
          <div className="whychoose-card">
            <FiMapPin className="whychoose-icon" />
            <h3 className="whychoose-title">Pan-India Campus Access</h3>
            <p className="whychoose-desc">
              Students can access Amity campuses across India for orientations, meetups, and convocation ceremonies.
            </p>
          </div>

          {/* Card 7 */}
          <div className="whychoose-card">
            <FiSmartphone className="whychoose-icon" />
            <h3 className="whychoose-title">Amigo: Learning On-the-Go</h3>
            <p className="whychoose-desc">
              A smart learning app with live classes, study materials, and progress tracking anytime, anywhere.
            </p>
          </div>

          {/* Card 8 */}
          <div className="whychoose-card">
            <FaRobot className="whychoose-icon" />
            <h3 className="whychoose-title">Prof. Ami: AI-Powered Tutor</h3>
            <p className="whychoose-desc">
              Get instant academic support with Prof. Ami, an AI-driven learning assistant for doubt-solving and guidance.
            </p>
          </div>

          {/* Card 9 */}
          <div className="whychoose-card">
            <FaCertificate className="whychoose-icon" />
            <h3 className="whychoose-title">Industry Certifications</h3>
            <p className="whychoose-desc">
              Earn valuable certifications from leading industry partners to strengthen your professional profile.
            </p>
          </div>

          {/* Card 10 */}
          <div className="whychoose-card">
            <MdWork className="whychoose-icon" />
            <h3 className="whychoose-title">Internship Opportunities</h3>
            <p className="whychoose-desc">
              Access curated internships with reputed companies to gain hands-on experience and career exposure.
            </p>
          </div>

          {/* Card 11 */}
          <div className="whychoose-card">
            <FaUserGraduate className="whychoose-icon" />
            <h3 className="whychoose-title">AI-Powered Career Platform</h3>
            <p className="whychoose-desc">
              A digital career platform with mock interviews, resume tools, and job search assistance to boost employability.
            </p>
          </div>

          {/* Card 12 */}
          <div className="whychoose-card">
            <FaUsers className="whychoose-icon" />
            <h3 className="whychoose-title">beSocial App for Campus Life</h3>
            <p className="whychoose-desc">
              A vibrant online community to network, join clubs, attend events, and connect with peers worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
