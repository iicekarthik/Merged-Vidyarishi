import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import Cart from "@/vidyarishiapi/models/User-info/Cart";
import { parse, serialize } from "cookie";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/vidyarishiapi/utils/jwt";
import cookie from "cookie";
import AppError from "@/vidyarishiapi/lib/AppError";
import Admin from "@/vidyarishiapi/models/Admin-info/Admin";
import User from "@/vidyarishiapi/models/User-info/User";


export default async function handler(req, res) {
  await dbConnect();

  try {
    // 🔐 AUTH (same as wishlist)
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    let accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    let decoded;

    if (accessToken) {
      decoded = verifyAccessToken(accessToken);
    } else if (refreshToken) {
      decoded = await verifyRefreshToken(refreshToken);
      if (!decoded?.id) throw new AppError("Unauthorized", 401);

      accessToken = generateAccessToken({ id: decoded.id });
      res.setHeader(
        "Set-Cookie",
        serialize("accessToken", accessToken, {
          httpOnly: true,
          path: "/",
          sameSite: "lax",
          maxAge: 60 * 15,
        })
      );

    } else {
      throw new AppError("Unauthorized", 401);
    }

    const userId = decoded.id;

    // 🔒 BLOCK ADMIN FROM CART
    const isAdmin = await Admin.findById(userId).select("_id");
    if (isAdmin) {
      throw new AppError("Admins are not allowed to use cart", 403);
    }

    // ✅ OPTIONAL: ensure valid user
    const isUser = await User.findById(userId).select("_id");
    if (!isUser) {
      throw new AppError("Unauthorized user", 401);
    }


    // 📥 GET USER CART (ENRICHED)
    if (req.method === "GET") {
      const cartItems = await Cart.find({ userId });

      const detailedCart = [];

      for (const item of cartItems) {
        const course = await Course.findOne({
          courseId: Number(item.courseId),
          isPublished: true,
        });

        if (!course) continue; // 🔥 skip broken items

        detailedCart.push({
          id: course.courseId,
          amount: item.quantity,
          price: course.offerPrice || course.coursePrice,
          product: {
            courseTitle: course.title,
            courseImg: course.courseImg || "/images/placeholder.png",
            price: course.offerPrice || course.coursePrice,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: detailedCart,
      });
    }


    // ➕ ADD TO USER CART
    if (req.method === "POST") {
      const { courseId } = req.body;
      if (!courseId) throw new AppError("courseId required", 400);

      const item = await Cart.findOneAndUpdate(
        { userId, courseId: Number(courseId) },
        { userId, courseId: Number(courseId), quantity: 1 },
        { upsert: true, new: true }
      );

      return res.status(201).json({
        success: true,
        message: "Added to cart",
        data: item,
      });
    }

    // ❌ REMOVE FROM USER CART
    if (req.method === "DELETE") {
      const { courseId } = req.body;
      await Cart.findOneAndDelete({
        userId,
        courseId: Number(courseId),
      });


      return res.status(200).json({
        success: true,
        message: "Removed from cart",
      });
    }

    res.status(405).end();
  } catch (err) {
    console.error("CART ERROR 👉", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
}
