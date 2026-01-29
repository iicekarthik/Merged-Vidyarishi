import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "PUT") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const {
      courseId,
      title,
      description,
      category,
      courseType,
      isPublished,
      coursePrice,
      offerPrice,
      courseImg,
      // lectures,
      // enrolledStudent,
      // rating,
      // totalReviews,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required to update course",
      });
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { courseId }, // ✅ MATCH CONDITION
      {
        title,
        description,
        category,
        courseType,
        isPublished,
        coursePrice,
        offerPrice,
        courseImg,
        // lectures,
        // enrolledStudent,
        // rating,
        // totalReviews,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
}
