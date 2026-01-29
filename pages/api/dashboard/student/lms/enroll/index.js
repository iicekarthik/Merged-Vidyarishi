import dbConnect from "@/vidyarishiapi/config/db";
import UserCourse from "@/vidyarishiapi/models/User-info/UserCourse";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import CourseContent from "@/vidyarishiapi/models/Courses-info/CourseContent";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;
  const role = req.user.role; // ✅ comes from JWT
  const { courseId } = req.body;

  // 🔒 BLOCK ADMINS
  if (role === "admin") {
    return res.status(403).json({
      message: "Admins cannot enroll in courses",
    });
  }

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required" });
  }

  try {
    const enrollment = await UserCourse.create({ userId, courseId });

    await CourseProgress.create({
      userId,
      courseId,
      completedVideos: [],
      completedSections: [],
      progressPercent: 0,
      isCompleted: false,
      certificateIssued: false,
    });

    return res.status(201).json({
      success: true,
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Already enrolled" });
    }
    return res.status(500).json({ message: error.message });
  }
});
