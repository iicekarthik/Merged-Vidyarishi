import dbConnect from "@/vidyarishiapi/config/db";
import CourseContent from "@/vidyarishiapi/models/Courses-info/CourseContent";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { getCourseStats } from "@/vidyarishiapi/utils/courseStats";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();
  adminAuth(req);

  const { courseId, sections, quiz, contentType } = req.body;

  if (!courseId) {
    return res.status(400).json({ message: "courseId required" });
  }

  if (!Array.isArray(sections)) {
    return res.status(400).json({
      success: false,
      message: "sections must be an array",
    });
  }

  const content = await CourseContent.findOneAndUpdate(
    { courseId },
    { sections, quiz, contentType },
    { upsert: true, new: true }
  );

  // Auto-calc lectures
  const { totalLectures } = getCourseStats(sections);

  // Update course lectures count
  await Course.findOneAndUpdate(
    { courseId },
    { lectures: totalLectures }
  );

  return res.status(200).json({
    success: true,
    content,
    totalLectures,
  });

}
