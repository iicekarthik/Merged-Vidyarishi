import dbConnect from "@/vidyarishiapi/config/db";
import Payment from "@/models/Payment";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    // ✅ Only admin should access
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Fetch ALL users' payments
    const payments = await Payment.find({})
      .populate("userId", "fullName email phone") // if userId is ref
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Admin payment fetch failed:", error);
    return res.status(500).json({ message: "Failed to fetch payments" });
  }
});
