import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  try {
    if (req.method !== "GET")
      return res.status(405).json({ message: "Method Not Allowed" });

    await dbConnect();
    adminAuth(req); // 🔐 admin only

    // 🔢 LEADS
    const totalLeads = await User.countDocuments();
    const newLeads = await User.countDocuments({ leadStatus: "new" });
    const contactedLeads = await User.countDocuments({ leadStatus: "contacted" });
    const convertedLeads = await User.countDocuments({ leadStatus: "converted" });

    // 📚 COURSES
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });

    return res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        contactedLeads,
        convertedLeads,
        totalCourses,
        publishedCourses,
      },
    });
  } catch (err) {
    return errorHandler(err, req, res);
  }
}

export default handler;
