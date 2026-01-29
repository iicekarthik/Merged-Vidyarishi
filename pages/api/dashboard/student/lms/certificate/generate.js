import dbConnect from "@/vidyarishiapi/config/db";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import Certificate from "@/vidyarishiapi/models/Courses-info/Certificate";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import User from "@/vidyarishiapi/models/User-info/User";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
import path from "path";
import QRCode from "qrcode";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required" });
  }

  // ✅ Check course completion
  const progress = await CourseProgress.findOne({ userId, courseId });
  if (!progress || !progress.isCompleted) {
    return res.status(403).json({
      message: "Course not completed. Certificate not available",
    });
  }

  // ✅ Create or fetch certificate
  let certificate = await Certificate.findOne({ userId, courseId });
  if (!certificate) {
    certificate = await Certificate.create({
      userId,
      courseId,
      certificateId: uuidv4(),
    });
  }

  if (!progress.certificateIssued) {
    progress.certificateIssued = true;
    await progress.save();
  }

  // ✅ Fetch user & course
  const user = await User.findById(userId);
  const course = await Course.findOne({ courseId });

  const completionDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* ============================
     PDF SETUP
  ============================ */
  const doc = new PDFDocument({
    size: [1100, 780],
    margin: 0,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=certificate-${courseId}.pdf`
  );

  doc.pipe(res);

  const imagePath = path.join(process.cwd(), "public", "certificates");

  const fontPath = path.join(process.cwd(), "public", "fonts");

  doc.registerFont("Georgia", `${fontPath}/georgia.ttf`);
  doc.registerFont("Georgia-Bold", `${fontPath}/georgiab.ttf`);
  doc.registerFont("Allura", `${fontPath}/Allura-Regular.ttf`);

  /* ============================
     BACKGROUND
  ============================ */
  doc.rect(0, 0, 1100, 780).fill("#fff");
  // doc.rect(0, 0, 1100, 780).fill("#f6f1ea");

  /* ============================
     OUTER BORDER
  ============================ */
  doc
    .lineWidth(3)
    .strokeColor("#2f57ef")
    .rect(20, 20, 1060, 740)
    .stroke();

  /* ============================
     INNER BORDER
  ============================ */
  doc
    .lineWidth(1)
    .rect(35, 35, 1030, 710)
    .stroke();

  /* ============================
     LOGO TEXT (Replace image safely)
  ============================ */
  doc.image(
    path.join(imagePath, "VR_logo2.png"),
    60,
    55,
    {
      width: 220,
      align: "left",
    }
  );

  /* ============================
     TITLE
  ============================ */
  doc
    .font("Georgia")
    .fillColor("#333")
    .fontSize(68)
    .text("CERTIFICATE", 0, 170, { align: "center" });

  doc
    .font("Georgia")
    .fontSize(18)
    .text("OF COMPLETION", 0, 245, {
      align: "center",
      characterSpacing: 6,
    });


  /* ============================
     SUBTEXT
  ============================ */
  doc
    .font("Georgia")
    .fontSize(16)
    .text("This certificate is presented to", 0, 290, {
      align: "center",
    });

  /* ============================
     STUDENT NAME
  ============================ */
  doc
    .font("Allura")
    .fontSize(52)
    .text(user.fullName || "Student Name", 0, 330, {
      align: "center",
    });

  doc
    .moveTo(360, 395)
    .lineTo(740, 395)
    .lineWidth(1)
    .strokeColor("#444")
    .stroke();

  /* ============================
     COURSE DETAILS
  ============================ */
  doc
    .font("Times-Italic")
    .fontSize(18)
    .fillColor("#333")
    .text(
      `On successfully completing the ${course.title} at Vidyarishi on ${completionDate}`,
      200,
      420,
      {
        align: "center",
        width: 700,
      }
    );

  /* ============================
    REAL QR CODE
 ============================ */

  // verification URL
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${certificate.certificateId}`;

  // generate QR as data URL
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    margin: 1,
    width: 120,
  });

  // draw QR image
  doc.image(qrDataUrl, 115, 515, {
    width: 100,
  });

  // label
  // doc
  //   .font("Georgia")
  //   .fontSize(10)
  //   .text("SCAN TO VERIFY", 105, 620, {
  //     width: 120,
  //     align: "center",
  //   });


  /* ============================
     SIGNATURE
  ============================ */
  doc.image(
    path.join(imagePath, "Ar Sign.png"),
    750,
    520,
    {
      width: 140,
    }
  );
  // signature line
  doc
    .moveTo(740, 565)
    .lineTo(920, 565)
    .stroke();

  // name
  doc
    .font("Georgia-Bold")
    .fontSize(14)
    .text("Ashish Ranjan", 740, 575, {
      width: 180,
      align: "center",
    });

  // designation
  doc
    .font("Times-Italic")
    .fontSize(12)
    .text("Founder", 740, 595, {
      width: 180,
      align: "center",
    });

  // doc
  //   .moveTo(740, 570)
  //   .lineTo(920, 570)
  //   .stroke();

  // doc
  //   .font("Georgia-Bold")
  //   .fontSize(14)
  //   .text("Ashish Ranjan", 740, 580, {
  //     width: 180,
  //     align: "center",
  //   });


  // doc
  //   .font("Times-Italic")
  //   .fontSize(12)
  //   .text("Founder", 740, 590, { width: 180, align: "center" });

  /* ============================
     FOOTER
  ============================ */
  doc
    .fontSize(12)
    .fillColor("#333")
    .text(
      "Verify certificate through : learner@vidyarishi.com",
      0,
      720,
      { align: "center" }
    );

  doc.end();
});
