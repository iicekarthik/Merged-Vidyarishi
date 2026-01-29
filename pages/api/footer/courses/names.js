// /api/courses/names.js
import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
    try {
        await dbConnect();

        const courses = await Course.find(
            { isPublished: true },          // filter if needed
            { title: 1, courseId: 1 }       // ✅ ONLY required fields
        )
            .sort({ createdAt: -1 })
            .limit(8);                      // footer limit

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch course names" });
    }
}
