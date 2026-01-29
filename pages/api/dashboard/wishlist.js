import dbConnect from "@/vidyarishiapi/config/db";
import Wishlist from "@/vidyarishiapi/models/User-info/Wishlist";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import AppError from "@/vidyarishiapi/lib/AppError";
import cookie from "cookie";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import User from "@/vidyarishiapi/models/User-info/User";
import Course from "@/vidyarishiapi/models/Courses-info/Course";

export default async function handler(req, res) {
  await dbConnect();

  try {
    // 🔐 AUTH
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    let accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    let decoded;

    if (accessToken) {
      decoded = verifyAccessToken(accessToken);
    }
    else if (refreshToken) {
      decoded = verifyRefreshToken(refreshToken);

      if (!decoded?.id) {
        throw new AppError("Unauthorized", 401);
      }

      accessToken = generateAccessToken({ id: decoded.id });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 15,
        })
      );
    }
    else {
      throw new AppError("Unauthorized", 401);
    }

    const userId = decoded.id;

    // ❌ BLOCK ADMIN FROM WISHLIST
    const isAdmin = await Admin.findById(userId).select("_id");
    if (isAdmin) {
      throw new AppError("Admins are not allowed to use wishlist", 403);
    }

    // ✅ Ensure valid user
    const isUser = await User.findById(userId).select("_id");
    if (!isUser) {
      throw new AppError("Unauthorized user", 401);
    }

    // 📥 GET wishlist (FULL COURSE DATA)
    if (req.method === "GET") {

      // 1️⃣ Fetch wishlist records
      const wishlistDocs = await Wishlist.find({ userId }).sort({ createdAt: -1 });

      if (!wishlistDocs.length) {
        return res.status(200).json({
          success: true,
          data: [],
        });
      }

      // 2️⃣ Extract courseIds
      const courseIds = wishlistDocs.map((w) => w.courseId);

      // 3️⃣ Fetch course details
      const courses = await Course.find({
        courseId: { $in: courseIds },
        isPublished: true,
      });

      // 4️⃣ Merge wishlist + course
      const response = wishlistDocs
        .map((w) => {
          const course = courses.find(
            (c) => c.courseId === w.courseId
          );

          if (!course) return null;

          return {
            ...course.toObject(),
            isWishlisted: true, // ✅ ADD THIS
            wishlistAddedAt: w.createdAt,
            wishlistId: w._id,
          };
        })
        .filter(Boolean);

      return res.status(200).json({
        success: true,
        data: response,
      });
    }

    // ➕ ADD to wishlist
    if (req.method === "POST") {
      const { courseId, courseTitle } = req.body;

      if (!courseId || !courseTitle) {
        throw new AppError("courseId and courseTitle are required", 400);
      }

      const exists = await Wishlist.findOne({ userId, courseId });

      if (exists) {
        return res.status(200).json({
          success: true,
          message: "Already in wishlist",
          data: exists,
        });
      }

      const wishlistItem = await Wishlist.create({
        userId,
        courseId,
        courseTitle,
      });

      return res.status(201).json({
        success: true,
        message: "Added to wishlist",
        data: wishlistItem,
      });
    }

    // ❌ REMOVE from wishlist
    if (req.method === "DELETE") {
      const { courseId } = req.body;
      if (!courseId) throw new AppError("courseId is required", 400);

      await Wishlist.findOneAndDelete({ userId, courseId });

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
      });
    }

    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`,
    });
  } catch (error) {
    console.error("Wishlist API error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}
