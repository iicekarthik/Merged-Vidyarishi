import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import CourseContent from "@/vidyarishiapi/models/Courses-info/CourseContent";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import cloudinary from "@/vidyarishiapi/config/cloudinary"; // ✅ ADD

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    await dbConnect();
    adminAuth(req);

    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }

    // 🔍 Find course first (IMPORTANT)
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 🗑️ delete course thumbnail
    if (course.courseImg?.public_id) {
      await cloudinary.uploader.destroy(course.courseImg.public_id);
    }

    // 🗑️ delete banner
    if (course.meta?.hero?.bannerImage?.public_id) {
      await cloudinary.uploader.destroy(
        course.meta.hero.bannerImage.public_id
      );
    }

    // 🗑️ delete brochure (PDF)
    if (course.meta?.brochure?.public_id) {
      await cloudinary.uploader.destroy(
        course.meta.brochure.public_id,
        { resource_type: "raw" }
      );
    }

    // 🗑️ DELETE COURSE
    await Course.deleteOne({ courseId });

    // ✅ Delete course
    const deletedCourse = await Course.findOneAndDelete({ courseId });

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ✅ ALSO delete course curriculum (sections & videos)
    await CourseContent.findOneAndDelete({ courseId });

    return res.status(200).json({
      success: true,
      message: "Course and curriculum deleted successfully",
    });

  } catch (err) {
    console.error("Delete course error:", err);
    return errorHandler(err, req, res);
  }
}
