import { IncomingForm } from "formidable";
import dbConnect from "@/vidyarishiapi/config/db";
import User from "@/vidyarishiapi/models/User-info/User";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";
import fs from "fs";

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
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("User not found", 404);

  const form = new IncomingForm({
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024, // 2MB
  });

  const file = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      if (!files.photo) reject("No image uploaded");
      resolve(files.photo[0]);
    });
  });

  /* 🔥 DELETE OLD IMAGE FROM CLOUDINARY */
  if (user.profileImage?.public_id) {
    await cloudinary.uploader.destroy(
      user.profileImage.public_id
    );
  }

  /* ☁️ UPLOAD NEW IMAGE */
  const result = await cloudinary.uploader.upload(file.filepath, {
    folder: "vidyarishi/student-profile",
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  });

  fs.unlinkSync(file.filepath);

  user.profileImage = {
    url: result.secure_url,
    public_id: result.public_id,
  };

  await user.save();

  return res.status(200).json({
    message: "Profile photo updated",
    profileImage: result.secure_url,
  });
}

export default errorHandler(handler);
