import React from "react";
import Image from "next/image";
import sampleCertificate from "@/public/certificates/sample-certificate.jpg";

const CareerScope = ({ careerScope }) => {
  if (!careerScope) return null;

  return (
    <section className="career-scope">
      <div className="career-scope-grid">

        {/* LEFT: Static Certificate (NO backend, NO DB) */}
        <div className="certificate-left">
          <h4>Sample Certificate</h4>

          <Image
            src={sampleCertificate}
            alt="Sample Course Completion Certificate"
            width={800}
            height={350}
            priority
            className="certificate-image"
          />
        </div>

        {/* RIGHT: Dynamic Career Scope Content */}
        <div className="career-content-right">
          <h3>{careerScope.title}</h3>
          <p>{careerScope.description}</p>

          {careerScope.roles && (
            <ul className="career-highlights">
              {careerScope.roles.map((role, i) => (
                <li key={i}>✔ {role}</li>
              ))}
            </ul>
          )}
        </div>

      </div>

      <style jsx>{`
        .career-scope {
          width: 100%;
        }

        .career-scope-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .certificate-left h4 {
          margin-bottom: 12px;
          font-weight: 600;
        }

        .certificate-image {
          border-radius: 8px;
          border: 1px solid #ddd;
          background: #fff;
        }

        .career-content-right h3 {
          margin-bottom: 12px;
        }

        .career-content-right p {
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .career-highlights {
          list-style: none;
          padding-left: 0;
          margin-top: 10px;
        }

        .career-highlights li {
          margin-bottom: 10px;
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .career-scope-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default CareerScope;
