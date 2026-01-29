import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
  await dbConnect();

  // ✅ CREATE COURSE
  if (req.method === "POST") {
    try {
      const course = await Course.create(req.body);

      return res.status(201).json({
        status: "success",
        data: course,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // ✅ GET ALL COURSES
  if (req.method === "GET") {
    try {
      const courses = await Course.find({ isPublished: true }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        status: "success",
        results: courses.length,
        data: courses,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
