import dbConnect from "@/vidyarishiapi/config/db";
import QuizAttempt from "@/vidyarishiapi/models/User-info/QuizAttempt";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async (req, res) => {
  await dbConnect();

  const attempts = await QuizAttempt.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const courseIds = attempts.map(a => a.courseId);

  const courses = await Course.find(
    { courseId: { $in: courseIds } },
    { courseId: 1, title: 1 }
  ).lean();

  const courseMap = {};
  courses.forEach(c => {
    courseMap[c.courseId] = c.title;
  });

  const enriched = attempts.map(a => ({
    ...a,
    courseTitle: courseMap[a.courseId] || "Course",
  }));

  res.status(200).json(enriched);
});
