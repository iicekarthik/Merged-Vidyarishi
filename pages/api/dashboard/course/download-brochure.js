import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import cloudinary from "@/vidyarishiapi/config/cloudinary";
import axios from "axios";

export const config = {
    api: { responseLimit: false },
};

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        await dbConnect();

        const { courseId } = req.query;
        const course = await Course.findOne({ courseId });

        if (!course?.meta?.brochure?.public_id) {
            return res.status(404).json({ message: "Brochure not found" });
        }

        // ✅ CREATE SIGNED DOWNLOAD URL (RAW SAFE)
        const signedUrl = cloudinary.utils.private_download_url(
            course.meta.brochure.public_id,
            "pdf",
            {
                resource_type: "raw",
                attachment: true,
                expires_at: Math.floor(Date.now() / 1000) + 60, // valid for 60s
            }
        );

        // ✅ DOWNLOAD VIA SERVER
        const response = await axios.get(signedUrl, {
            responseType: "arraybuffer",
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${course.title}-Brochure.pdf"`
        );
        res.setHeader("Content-Length", response.data.length);
        res.setHeader("Cache-Control", "no-store");

        return res.end(response.data);
    } catch (err) {
        console.error("Brochure download error:", err);
        return res.status(500).json({ message: "Failed to download brochure" });
    }
}
