import { IncomingForm } from "formidable";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

export const config = {
  api: { bodyParser: false },
};

async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();
  adminAuth(req);

  const form = new IncomingForm({
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true,
  });

  const { file, courseId } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({
        file: files.courseImg?.[0],
        courseId: fields.courseId?.[0],
      });
    });
  });

  if (!file || !courseId)
    return res.status(400).json({ message: "Image or courseId missing" });

  const course = await Course.findOne({ courseId });
  if (!course)
    return res.status(404).json({ message: "Course not found" });

  // 🧹 delete old image
  if (course.courseImg?.public_id) {
    await cloudinary.uploader.destroy(course.courseImg.public_id);
  }

  // ☁️ upload new
  const upload = await cloudinary.uploader.upload(file.filepath, {
    folder: "vidyarishi/course-images",
    resource_type: "image",
    transformation: [{ width: 600, height: 400, crop: "fill" }],
  });

  course.courseImg = {
    url: upload.secure_url,
    public_id: upload.public_id,
  };

  await course.save();

  res.status(200).json({
    message: "Course image uploaded",
    image: upload.secure_url,
  });
}

export default errorHandler(handler);
