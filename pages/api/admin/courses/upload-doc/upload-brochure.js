import { IncomingForm } from "formidable";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";

export const config = { api: { bodyParser: false } };

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
        file: files.brochure?.[0],
        courseId: fields.courseId?.[0],
      });
    });
  });

  if (!file || !courseId)
    return res.status(400).json({ message: "Missing brochure or courseId" });

  const course = await Course.findOne({ courseId });
  if (!course) return res.status(404).json({ message: "Course not found" });

  // 🧹 delete old brochure
  if (course.meta?.brochure?.public_id) {
    await cloudinary.uploader.destroy(
      course.meta.brochure.public_id,
      {
        resource_type: course.meta.brochure.resource_type || "raw",
      }
    );
  }

  // ☁️ upload brochure
  const upload = await cloudinary.uploader.upload(file.filepath, {
    folder: "vidyarishi/course-brochures",
    resource_type: "raw",
    format: "pdf",                 // 🔥 FORCE pdf
    // type: "upload",
    type: "private",
    access_mode: "public",   // 🔥 THIS IS THE FIX
    use_filename: true,
    unique_filename: true,
  });


  course.meta.brochure = {
    url: upload.secure_url,
    public_id: upload.public_id,
  };

  await course.save();

  res.json({ success: true, brochure: upload.secure_url });
}
