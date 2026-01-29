import dbConnect from "@/vidyarishiapi/config/db";
import CourseContent from "@/vidyarishiapi/models/Courses-info/CourseContent";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();

    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    const content = await CourseContent.findOne({
      courseId: Number(courseId),
    });

    if (!content) {
      return res.status(200).json({
        success: true,
        sections: [],
      });
    }

    return res.status(200).json({
      success: true,
      contentType: content.contentType || "sections",
      sections: content.sections || [],
      quiz: content.quiz || { questions: [] },
    });
    
  } catch (error) {
    console.error("Course content fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
