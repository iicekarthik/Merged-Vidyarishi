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

    const courses = await Course.find({ isPublished: true })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, courses });
  } catch (err) {
    return errorHandler(err, req, res);
  }
}