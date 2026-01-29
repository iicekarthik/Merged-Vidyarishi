import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
  await dbConnect();
  const { courseId } = req.query;

  // ✅ GET SINGLE COURSE
  if (req.method === "GET") {
    try {
      const course = await Course.findOne({ courseId });

      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: course,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // ✅ UPDATE COURSE
  if (req.method === "PUT") {
    try {
      const updatedCourse = await Course.findOneAndUpdate(
        { courseId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }

      return res.status(200).json({
        status: "success",
        data: updatedCourse,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // ✅ DELETE COURSE
  if (req.method === "DELETE") {
    try {
      const deleted = await Course.findOneAndDelete({ courseId });

      if (!deleted) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
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
