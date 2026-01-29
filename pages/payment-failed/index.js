import { useRouter } from "next/router";
import { XCircle } from "lucide-react";

export default function PaymentFailed() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <XCircle size={72} color="#dc2626" style={styles.icon} />

        <h2 style={styles.heading}>Payment Failed</h2>
        <p style={styles.subtext}>Your transaction was not successful.</p>
        <p style={styles.orderId}>Order ID: {order_id}</p>

        <button
          onClick={() => router.push("/pay-online")}
          style={styles.button}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

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
    maxWidth: "600px",
    width: "100%",
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },
  icon: {
    marginBottom: "1.5rem",
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
    fontWeight: "500",
    marginBottom: "1rem",
  },
  orderId: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "2rem",
  },
  button: {
    backgroundColor: "#dc2626",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};
