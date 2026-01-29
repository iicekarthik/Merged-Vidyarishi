import { IncomingForm } from "formidable";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";

export const config = {
  api: { bodyParser: false },
};

async function handler(req, res) {
  if (req.method !== "POST")
    throw new AppError("Method not allowed", 405);

  await dbConnect();

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;
  if (!token) throw new AppError("Unauthorized", 401);

  const decoded = verifyAccessToken(token);
  if (decoded.role !== "admin") throw new AppError("Forbidden", 403);

  const admin = await Admin.findById(decoded.id);
  if (!admin) throw new AppError("Admin not found", 404);

  const form = new IncomingForm({
    maxFileSize: 2 * 1024 * 1024,
    keepExtensions: true,
  });

  const file = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(new AppError("Upload failed", 400));
      resolve(files.photo?.[0]);
    });
  });

  if (!file) throw new AppError("No image uploaded", 400);

  // 🧹 Delete old image from Cloudinary
  if (admin.profilePhoto?.public_id) {
    await cloudinary.uploader.destroy(
      admin.profilePhoto.public_id
    );
  }

  // ☁️ Upload new image
  const upload = await cloudinary.uploader.upload(file.filepath, {
    folder: "vidyarishi/admin-profile",
    resource_type: "image",
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  });

  admin.profilePhoto = {
    url: upload.secure_url,
    public_id: upload.public_id,
  };

  await admin.save();

  res.status(200).json({
    message: "Profile photo updated",
    profilePhoto: upload.secure_url,
  });
}

export default errorHandler(handler);
