import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyCertificate() {
  const router = useRouter();
  const { certificateId } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!certificateId) return;

    fetch(`/api/dashboard/verify/${certificateId}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [certificateId]);

  if (loading) {
    return <div className="center">Verifying certificate…</div>;
  }

  if (!data?.valid) {
    return <div className="center invalid">❌ Invalid Certificate</div>;
  }

  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
        <img src="/certificates/VR_logo2.png" alt="Vidyarishi" />
      </div>

      {/* CERTIFICATE ID */}
      <div className="cert-id">
        {data.certificateId}
      </div>

      {/* AUTHENTIC BADGE */}
      <div className="badge-wrapper">
        <div className="badge">
          <span>AUTHENTIC</span>
        </div>
      </div>

      {/* VERIFIED TEXT */}
      <h2 className="verified-text">
        THIS IS A VERIFIED CERTIFICATE!
      </h2>

      <div className="divider" />

      {/* DETAILS */}
      <div className="details">
        <h3>{data.name}</h3>
        <p>{data.course}</p>
        <span>{new Date(data.issuedOn).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })}</span>
      </div>
      <style jsx>{`
  .page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f5f8ff 0%, #ffffff 65%);
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    text-align: center;
  }

  /* HEADER */
  .header {
    padding: 18px 0;
    background: linear-gradient(90deg, #061a3a 0%, #0b2d66 100%);
    box-shadow: 0 4px 12px rgba(6, 26, 58, 0.25);
  }

  .header img {
    height: 42px;
  }

  /* CERT ID */
  .cert-id {
    background: linear-gradient(90deg, #0b2d66, #1d4ed8);
    color: #ffffff;
    margin: 28px auto;
    padding: 14px 22px;
    border-radius: 12px;
    width: 90%;
    max-width: 420px;
    font-weight: 600;
    letter-spacing: 0.6px;
    box-shadow: 0 6px 16px rgba(29, 78, 216, 0.35);
  }

  /* BADGE */
  .badge-wrapper {
    margin: 34px 0 14px;
  }

  .badge {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
    background: radial-gradient(circle at top, #3b82f6, #1e40af);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 28px rgba(30, 64, 175, 0.35);
  }

  .badge span {
    color: #ffffff;
    font-weight: 800;
    letter-spacing: 2px;
    font-size: 14px;
  }

  /* VERIFIED TEXT */
  .verified-text {
    font-size: 22px;
    font-weight: 800;
    color: #061a3a;
    margin-top: 22px;
  }

  .divider {
    width: 70px;
    height: 3px;
    background: linear-gradient(90deg, #0b2d66, #1d4ed8);
    margin: 18px auto 22px;
    border-radius: 3px;
  }

  /* DETAILS */
  .details h3 {
    font-size: 26px;
    margin-bottom: 6px;
    color: #061a3a;
    font-weight: 700;
  }

  .details p {
    font-size: 17px;
    color: #344767;
    margin-bottom: 6px;
  }

  .details span {
    color: #6b7280;
    font-size: 15px;
  }

  /* STATES */
  .center {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #0b2d66;
  }

  .invalid {
    color: #dc2626;
    font-weight: 600;
  }
`}</style>


    </div>
  );
}

{/* <style jsx>{`
        .page {
          min-height: 100vh;
          background: #ffffff;
          font-family: "Helvetica Neue", Arial, sans-serif;
          text-align: center;
        }

        .header {
          padding: 18px 0;
          border-bottom: 1px solid #eee;
        }

        .header img {
          height: 42px;
        }

        .cert-id {
          background: #0b5d4a;
          color: #fff;
          margin: 24px auto;
          padding: 14px 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 380px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .badge-wrapper {
          margin: 30px 0 10px;
        }

        .badge {
          width: 130px;
          height: 130px;
          margin: auto;
          border-radius: 50%;
          background: #6cc24a;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .badge span {
          color: #fff;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .verified-text {
          font-size: 22px;
          font-weight: 700;
          color: #2c3e50;
          margin-top: 20px;
        }

        .divider {
          width: 60px;
          height: 3px;
          background: #ccc;
          margin: 18px auto;
        }

        .details h3 {
          font-size: 26px;
          margin-bottom: 6px;
          color: #2c3e50;
        }

        .details p {
          font-size: 18px;
          color: #555;
          margin-bottom: 6px;
        }

        .details span {
          color: #888;
          font-size: 15px;
        }

        .center {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .invalid {
          color: #c0392b;
        }
      `}</style>

      <style jsx>{`
  .page {
    min-height: 100vh;
    background: linear-gradient(180deg, #f6f9ff 0%, #ffffff 60%);
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    text-align: center;
  }
  .header {
    padding: 18px 0;
    background: linear-gradient(90deg, #071b3a 0%, #0b2d66 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .header img {
    height: 42px;
  }

  .cert-id {
    background: linear-gradient(90deg, #0f5132, #198754);
    color: #ffffff;
    margin: 28px auto;
    padding: 14px 22px;
    border-radius: 12px;
    width: 90%;
    max-width: 420px;
    font-weight: 600;
    letter-spacing: 0.6px;
    box-shadow: 0 6px 16px rgba(25, 135, 84, 0.25);
  }

 
  .badge-wrapper {
    margin: 34px 0 14px;
  }

  .badge {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
    background: radial-gradient(circle at top, #7ed957, #4caf50);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.18);
  }

  .badge span {
    color: #ffffff;
    font-weight: 800;
    letter-spacing: 2px;
    font-size: 14px;
  }

  
  .verified-text {
    font-size: 22px;
    font-weight: 800;
    color: #0b2d66;
    margin-top: 22px;
  }

  .divider {
    width: 70px;
    height: 3px;
    background: linear-gradient(90deg, #0b2d66, #198754);
    margin: 18px auto 22px;
    border-radius: 3px;
  }


  .details h3 {
    font-size: 26px;
    margin-bottom: 6px;
    color: #071b3a;
    font-weight: 700;
  }

  .details p {
    font-size: 17px;
    color: #344767;
    margin-bottom: 6px;
  }

  .details span {
    color: #6c757d;
    font-size: 15px;
  }
 
  .center {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #0b2d66;
  }

  .invalid {
    color: #dc3545;
    font-weight: 600;
  }
`}</style> 

*/}

