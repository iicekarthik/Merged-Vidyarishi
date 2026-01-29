import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PaymentRedirect() {
  const router = useRouter();
  const { order_id } = router.query;

  useEffect(() => {
    if (!order_id) return;

    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-payment?order_id=${order_id}`);
        const data = await res.json();

        if (data?.status === "PAID") {
          router.replace(`/payment-success?order_id=${order_id}`);
        } else {
          router.replace(`/payment-failed?order_id=${order_id}`);
        }
      } catch (err) {
        console.error("Redirection error:", err);
        router.replace(`/payment-failed?order_id=${order_id}`);
      }
    };

    verify();
  }, [order_id]);

  return (
    <>
      <p
        style={{
          backgroundColor: "#FEF3C7",
          color: "#92400E",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          marginBottom: "1.5rem",
          fontWeight: 600,
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        ⚠️ Please do not refresh or close this page while your payment is being
        verified.
      </p>
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Redirecting...</p>
    </>
  );
}
