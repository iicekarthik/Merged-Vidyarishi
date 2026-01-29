// /api/admin/certificates/history.js
import dbConnect from "@/vidyarishiapi/config/db";
import Certificate from "@/vidyarishiapi/models/Courses-info/Certificate";
import User from "@/vidyarishiapi/models/User-info/User";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";

export default async function handler(req, res) {
  await dbConnect();

  const cookies = parse(req.headers.cookie || "");
  verifyAccessToken(cookies.accessToken);

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const certificates = await Certificate.find()
    .sort({ createdAt: -1 })
    .lean();

  const userIds = certificates.map(c => c.userId);
  const courseIds = certificates.map(c => c.courseId);

  const users = await User.find({ _id: { $in: userIds } })
    .select("fullName phone email city state")
    .lean();

  const courses = await Course.find({ courseId: { $in: courseIds } })
    .select("courseId title")
    .lean();

  const data = certificates.map(cert => {
    const user = users.find(u => u._id.toString() === cert.userId.toString());
    const course = courses.find(c => c.courseId === cert.courseId);

    return {
      ...cert,
      student: user,
      courseTitle: course?.title || "—",
    };
  });

  res.status(200).json({ success: true, certificates: data });
}
