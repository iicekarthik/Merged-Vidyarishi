export const sendReceiptEmail = async ({
  orderId,
  customerName,
  customerEmail,
}) => {
  try {
    const res = await fetch("/api/send-receipt-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        customerEmail,
        customerName,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      console.error("Email send failed:", data.error);
      return false;
    }
  } catch (err) {
    console.error("Email service error:", err);
    return false;
  }
};
