import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import api from "@/vidyarishiapi/lib/axios";
import { sendReceiptEmail } from "@/utils/sendReceiptEmail"; // adjust path


const PaymentSuccess = () => {
  const router = useRouter();
  const { order_id } = router.query;

  const [status, setStatus] = useState("verifying");
  const [payment, setPayment] = useState(null);


  useEffect(() => {
    if (!order_id) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/verify-payment?order_id=${order_id}`);
        const data = await res.json();

        // if (res.ok) {
        //   setPayment(data.payment);
        //   setStatus(data.status === "PAID" ? "success" : "pending");
        // } else {
        //   setStatus("failed");
        // }
        if (res.ok && data.status === "PAID") {
          setPayment(data.payment);
          setStatus("success");

          const courseId = data.courseId;
          // ✅ SEND RECEIPT EMAIL (backend will fetch all data)
          await sendReceiptEmail({
            orderId: order_id,
          });

          // ✅ AUTO ENROLL
          try {
            for (const id of data.courseIds) {
              try {
                await api.post("/api/dashboard/student/lms/enroll", { courseId: id });
              } catch (err) {
                console.log("Already enrolled:", id);
              }
            }

          } catch (err) {
            // ignore if already enrolled
            console.log("Already enrolled or enroll failed");
          }

          // ✅ AUTO REDIRECT (after 2 seconds)
          setTimeout(() => {
            router.replace(`/dashboard/enrolled-course`);
            // OR
            // router.replace(`/course-details/${courseId}`);
            // router.replace("/");
          }, 2000);

        } else {
          setStatus("failed");
        }

      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [order_id]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (status === "verifying") {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [status]);

  const amount = payment?.orderAmount;
  const orderNote = payment?.orderNote;
  const dateTime = payment?.createdAt
    ? new Date(payment.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })
    : "";

  const renderIcon = () => {
    const baseStyle = { width: 72, height: 72 };
    switch (status) {
      case "verifying":
        return (
          <Loader2
            style={{ ...baseStyle, color: "#4f46e5" }}
            className="animate-spin"
          />
        );
      case "success":
        return <CheckCircle2 style={{ ...baseStyle, color: "#16a34a" }} />;
      case "failed":
        return <XCircle style={{ ...baseStyle, color: "#dc2626" }} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {status === "verifying" && (
        <p style={styles.warning}>
          ⚠️ Please do not refresh or close this page while your payment is
          being verified.
        </p>
      )}
      <div style={styles.card}>

        <div style={{ marginBottom: "1.5rem" }}>{renderIcon()}</div>

        <h2 style={styles.heading}>
          {status === "success"
            ? "Payment Successful"
            : status === "failed"
              ? "Payment Failed"
              : "Verifying Payment..."}
        </h2>

        {status === "success" && (
          <>
            <p style={styles.subtext}>Thank you for your payment!</p>

            <hr style={styles.divider} />

            <div style={styles.details}>
              <InfoRow label="Amount Paid:" value={`₹ ${amount}`} />
              <InfoRow label="Payment For:" value={orderNote} />
              <InfoRow label="Date & Time:" value={dateTime} />
              <InfoRow label="Order ID:" value={order_id} />
            </div>

            <div style={styles.buttonGroup}>
              {/* <ActionButton
                text="Back to Home"
                onClick={() => router.push("/pay-online")}
              /> */}
              <ActionButton
                text="Go to Course"
                primary
                onClick={() => router.push(`/dashboard/enrolled-course`)}
              />

              {/* <ActionButton text="Print Receipt" onClick={handlePrint} primary /> */}
            </div>
          </>
        )}

        {status === "failed" && (
          <p style={styles.errorText}>
            Something went wrong during payment verification. Please contact
            support.
          </p>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <span style={styles.label}>{label}</span>
    <span style={styles.value}>{value}</span>
  </div>
);

const ActionButton = ({ text, onClick, primary = false }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.button,
      backgroundColor: primary ? "#0F172A" : "#FFFFFF",
      color: primary ? "#FFFFFF" : "#0F172A",
      border: primary ? "none" : "1px solid #0F172A",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.backgroundColor = primary ? "#1E293B" : "#F3F4F6")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.backgroundColor = primary ? "#0F172A" : "#FFFFFF")
    }
  >
    {text}
  </button>
);

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    maxWidth: "640px",
    width: "100%",
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  subtext: {
    color: "#4b5563",
    fontSize: "18px",
    fontWeight: 500,
  },
  divider: {
    margin: "2rem 0",
    borderColor: "#e5e7eb",
  },
  details: {
    textAlign: "left",
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    color: "#374151",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: "#6b7280",
  },
  value: {
    fontWeight: 600,
    color: "#111827",
  },
  buttonGroup: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  button: {
    fontSize: "16px",
    fontWeight: 600,
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "all 0.3s",
    minWidth: "140px",
  },
  errorText: {
    color: "#dc2626",
    fontWeight: "500",
    marginTop: "1.25rem",
  },
  warning: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    marginBottom: "1.5rem",
    fontWeight: 600,
    fontSize: "14px",
    textAlign: "center",
  },
};

export default PaymentSuccess;
