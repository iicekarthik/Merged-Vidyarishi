import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") throw new Error("Method Not Allowed");

    await dbConnect();
    adminAuth(req);

    const courses = await Course.find().sort({ createdAt: -1 });

    res.json({ success: true, courses });
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
