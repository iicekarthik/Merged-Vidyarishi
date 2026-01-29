import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";

async function handler(req, res) {
  if (req.method !== "PUT") {
    throw new AppError("Method Not Allowed", 405);
  }

  await dbConnect();

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;
  if (!token) throw new AppError("Unauthorized", 401);

  const decoded = verifyAccessToken(token);
  if (decoded.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }

  const socialFields = [
    "facebook",
    "twitter",
    "linkedin",
    "website",
    "github",
  ];

  const updateData = {};
  socialFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  });

  const admin = await Admin.findByIdAndUpdate(
    decoded.id,
    updateData,
    { new: true }
  ).select("-__v");

  if (!admin) throw new AppError("Admin not found", 404);

  res.status(200).json({
    message: "Social links updated successfully",
    admin,
  });
}

export default errorHandler(handler);
