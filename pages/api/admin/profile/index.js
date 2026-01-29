import dbConnect from "@/vidyarishiapi/config/db";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";
import AppError from "@/vidyarishiapi/lib/AppError";

async function handler(req, res) {
  await dbConnect();

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;

  if (!token) throw new AppError("Unauthorized", 401);

  const decoded = verifyAccessToken(token);
  // console.log("ADMIN TOKEN:", decoded);

  if (decoded.role !== "admin") {
    return res.status(403).json({ isAdmin: false });
  }

  const admin = await Admin.findById(decoded.id).select("-__v");

if (!admin) throw new AppError("Admin not found", 404);

return res.status(200).json({
  role: "admin",
  admin,
});

}

export default errorHandler(handler);
