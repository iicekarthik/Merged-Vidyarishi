import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }

    await dbConnect();

    const { courseId } = req.query;

    if (!courseId) {
      return res
        .status(400)
        .json({ success: false, message: "courseId is required" });
    }

    // ✅ FIND BY courseId (NOT _id)
    const course = await Course.findOne({ courseId: Number(courseId) });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // ✅ ALWAYS SEND RESPONSE
    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}
