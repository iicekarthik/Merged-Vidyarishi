import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
  await dbConnect();

  const { category, courseId } = req.query;

  if (!category || !courseId) {
    return res.status(400).json({
      message: "category and courseId are required",
    });
  }

  try {
    const relatedCourses = await Course.find({
      category,
      courseId: { $ne: Number(courseId) }, // ❌ exclude current course
      isPublished: true,
    })
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({ courses: relatedCourses });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch related courses",
    });
  }
}
