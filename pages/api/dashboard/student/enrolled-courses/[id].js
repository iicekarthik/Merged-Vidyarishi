import dbConnect from "@/vidyarishiapi/config/db";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;
  const { id } = req.query; // ✅ id = courseId (e.g. "305")

  const courseId = Number(id);
  if (!courseId) {
    return res.status(400).json({ message: "Invalid courseId" });
  }

  // 🔍 Find progress by userId + courseId (NOT _id)
  const progress = await CourseProgress.findOne({ userId, courseId });

  if (!progress) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  // 🔼 TEMP: manual progress increment (you can remove later)
  let newProgress = progress.progressPercent + 10;
  if (newProgress > 100) newProgress = 100;

  progress.progressPercent = newProgress;
  progress.isCompleted = newProgress === 100;

  await progress.save();

  return res.status(200).json({
    success: true,
    courseId,
    progress: progress.progressPercent,
    status: progress.isCompleted ? "completed" : "active",
  });
});
