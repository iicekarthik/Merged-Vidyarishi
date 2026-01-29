import dbConnect from "@/vidyarishiapi/config/db";
import Payment from "@/models/Payment";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    const userId = req.user.id;

    // ✅ FETCH ALL STATUSES
    const orders = await Payment.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch failed:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});
