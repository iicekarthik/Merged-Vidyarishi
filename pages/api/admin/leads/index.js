import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import AppError from "@/vidyarishiapi/lib/AppError";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
  await dbConnect();

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;
  if (!token) throw new AppError("Unauthorized", 401);
  verifyAccessToken(token);

  /* ===================== GET ===================== */
  if (req.method === "GET") {
    const users = await User.find({})
      .select(
        "fullName phone alternatePhone email alternateEmail course city state qualification whatsapp isPhoneNumberVerified leadStatus remark createdAt lastLoginAt"
      )
      .sort({ createdAt: -1 });

    const userIds = users.map(u => u._id);

    const progress = await CourseProgress.find({
      userId: { $in: userIds },
    });

    const courseIds = progress.map(p => p.courseId);
    const courses = await Course.find({ courseId: { $in: courseIds } });

    const leads = users.map(user => {
      const userProgress = progress.filter(
        p => p.userId.toString() === user._id.toString()
      );

      const enrolledCourses = userProgress.map(p => {
        const course = courses.find(c => c.courseId === p.courseId);
        if (!course) return null;

        return {
          courseId: course.courseId,
          title: course.title,
          progress: p.progressPercent,
          isCompleted: p.isCompleted,
          completedAt: p.completedAt || null,
        };
      }).filter(Boolean);

      return {
        ...user.toObject(),
        enrolledCourses,
        completedCourses: enrolledCourses.filter(c => c.isCompleted),
      };
    });

    return res.status(200).json({ success: true, leads });
  }

  /* ===================== PATCH (FIX) ===================== */
  if (req.method === "PATCH") {
    const { leadId, leadStatus, remark } = req.body;

    if (!leadId || !leadStatus) {
      throw new AppError("leadId and leadStatus required", 400);
    }

    const updated = await User.findByIdAndUpdate(
      leadId,
      {
        leadStatus,
        ...(remark && { remark }),
      },
      { new: true }
    );

    if (!updated) {
      throw new AppError("Lead not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated",
    });
  }

  /* ===================== DELETE ===================== */
  if (req.method === "DELETE") {
    const { leadId } = req.body;

    if (!leadId) {
      throw new AppError("leadId required", 400);
    }

    await User.findByIdAndDelete(leadId);

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  }

  /* ===================== METHOD NOT ALLOWED ===================== */
  throw new AppError("Method Not Allowed", 405);
}

export default errorHandler(handler);
