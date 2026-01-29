// pages/api/dashboard/student/lms/quiz-attempt/latest.js
import dbConnect from "@/vidyarishiapi/config/db";
import QuizAttempt from "@/vidyarishiapi/models/User-info/QuizAttempt";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async (req, res) => {
  await dbConnect();

  const { courseId } = req.query;

  const attempt = await QuizAttempt.findOne({
    userId: req.user.id,
    courseId: Number(courseId),
  })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json(attempt || null);
});
