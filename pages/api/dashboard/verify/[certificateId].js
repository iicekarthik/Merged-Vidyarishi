import dbConnect from "@/vidyarishiapi/config/db";
import Certificate from "@/vidyarishiapi/models/Courses-info/Certificate";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import User from "@/vidyarishiapi/models/User-info/User";

export default async function handler(req, res) {
  await dbConnect();

  const { certificateId } = req.query;

  const cert = await Certificate.findOne({ certificateId });
  if (!cert) {
    return res.status(404).json({ valid: false });
  }

  const user = await User.findById(cert.userId);
  const course = await Course.findOne({ courseId: cert.courseId });

  res.status(200).json({
    valid: true,
    name: user.fullName,
    course: course.title,
    issuedOn: cert.createdAt,
    certificateId,
  });
}
