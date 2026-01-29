import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    await dbConnect();

    const admin = adminAuth(req);

     // 🔢 AUTO courseId starting from 1
    const lastCourse = await Course.findOne().sort({ courseId: -1 }).lean();
    const nextCourseId = lastCourse ? lastCourse.courseId + 1 : 1;

   
    const course = await Course.create({
      courseId: nextCourseId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      courseType: req.body.courseType,
      isPublished: req.body.isPublished,
      coursePrice: req.body.coursePrice,
      offerPrice: req.body.offerPrice,
      // courseImg: req.body.courseImg,
      // lectures: req.body.lectures,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    // ✅ MUST RETURN
    return errorHandler(err, req, res);
  }
}