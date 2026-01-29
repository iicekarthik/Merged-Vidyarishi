import { IncomingForm } from "formidable";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  await dbConnect();
  adminAuth(req);

  const form = new IncomingForm({ keepExtensions: true });

  const { file, courseId } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({
        file: files.banner?.[0],
        courseId: fields.courseId?.[0],
      });
    });
  });

  if (!file || !courseId)
    return res.status(400).json({ message: "Missing banner or courseId" });

  const course = await Course.findOne({ courseId });
  if (!course) return res.status(404).json({ message: "Course not found" });

  // 🧹 delete old banner
  if (course.meta?.hero?.bannerImage?.public_id) {
    await cloudinary.uploader.destroy(
      course.meta.hero.bannerImage.public_id
    );
  }

  // ☁️ upload new banner
  const upload = await cloudinary.uploader.upload(file.filepath, {
    folder: "vidyarishi/course-banners",
    transformation: [{ width: 1200, height: 500, crop: "fill" }],
  });

  course.meta.hero.bannerImage = {
    url: upload.secure_url,
    public_id: upload.public_id,
    resource_type: upload.resource_type, // 👈 add this
  };

  await course.save();

  res.json({ success: true, banner: upload.secure_url });
}
