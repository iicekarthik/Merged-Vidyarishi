import dbConnect from "@/vidyarishiapi/config/db";
import Enquiry from "@/vidyarishiapi/models/User-info/Enquiry";
import User from "@/vidyarishiapi/models/User-info/User";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
import { parse } from "cookie";
import AppError from "@/vidyarishiapi/lib/AppError";
import { errorHandler } from "@/vidyarishiapi/lib/errorHandler";

async function handler(req, res) {
    await dbConnect();

    const cookies = parse(req.headers.cookie || "");
    const token = cookies.accessToken;
    if (!token) throw new AppError("Unauthorized", 401);
    verifyAccessToken(token);

    /* ===================== GET ===================== */
    if (req.method === "GET") {
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, enquiries });
    }

    /* ===================== PATCH (STATUS) ===================== */
    if (req.method === "PATCH") {
        const { enquiryId, status } = req.body;

        if (!enquiryId || !status) {
            throw new AppError("enquiryId and status required", 400);
        }

        await Enquiry.findByIdAndUpdate(enquiryId, { status });
        return res.json({ success: true });
    }

    /* ===================== POST (CONVERT → LEAD) ===================== */
    if (req.method === "POST") {
        const { enquiryId } = req.body;

        const enquiry = await Enquiry.findById(enquiryId);
        if (!enquiry) throw new AppError("Enquiry not found", 404);

        // 🔒 Prevent double conversion
        if (enquiry.convertedToLead) {
            throw new AppError("Already converted to lead", 400);
        }

        // ➜ Create lead (User)
        await User.create({
            fullName: enquiry.name,
            phone: enquiry.phone,
            email: enquiry.email,
            course: enquiry.courseName,
            leadStatus: "new",
        });

        enquiry.convertedToLead = true;
        await enquiry.save();

        return res.json({ success: true });
    }

    /* ===================== DELETE ===================== */
    if (req.method === "DELETE") {
        const { enquiryId } = req.body;

        if (!enquiryId) {
            throw new AppError("enquiryId required", 400);
        }

        await Enquiry.findByIdAndDelete(enquiryId);

        return res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    }


    throw new AppError("Method Not Allowed", 405);
}

export default errorHandler(handler);
