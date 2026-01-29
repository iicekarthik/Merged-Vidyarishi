import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import dbConnect from "@/lib/mongoose";
import Payment from "../../models/Payment";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: "orderId is required" });
  }

  await dbConnect();

  try {
    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${orderId}.pdf"`);
      res.send(pdfBuffer);
    });

    // ==== HEADER SECTION ====
    const logoPath = path.join(
      process.cwd(),
      "public/images/vidya/logo/VR_logo.png"
    );
    const hasLogo = fs.existsSync(logoPath);
    const startY = 50;

    // Column layout
    const leftX = 50;
    const centerX = 220;
    const rightX = 400;

    // Logo
    if (hasLogo) {
      doc.image(logoPath, leftX, startY, { width: 120 });
    }

    // Center Title
    doc
      .moveDown(3)
      .fontSize(18)
      .font("Helvetica-Bold")
      .text("Invoice", { align: "center" });
    // doc
    //   .fontSize(12)
    //   .font("Helvetica")
    //   .text("Payment Successfull", { align: "center" });

    // doc.moveDown(6)
    // Invoice Info Right Side
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(`Invoice ID: ${payment.orderId}`, rightX, startY + 80)
      .text(
        `Issued Date: ${new Date(payment.createdAt).toLocaleDateString(
          "en-IN"
        )}`
      );

    // From (Left Column)
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("From:", leftX, startY + 130)
      .text("Vidyarishi", leftX)
      .font("Helvetica")
      .text("2/B-14, Vivina,", leftX)
      .text("NADCO Shopping Centre,", leftX)
      .text("Opp. Railway Station,", leftX)
      .text("Behind Bus Depo,", leftX)
      .text("Railway Colony,", leftX)
      .text("Andheri West, Mumbai,", leftX)
      .text("Maharashtra 400058", leftX);

    // To (Right Column)
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("To:", rightX, startY + 130)
      .font("Helvetica")
      .text(payment.customerName, rightX)
      .text(payment.customerEmail, rightX)
      .text(payment.customerPhone || "India", rightX);

    doc.moveDown(4);

    // === PRODUCT TABLE ===
    const tableY = doc.y + 30;

    doc
      .moveTo(leftX, tableY - 5)
      .lineTo(550, tableY - 5)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Course", leftX, tableY)
      .text("Amount", rightX, tableY);

    doc
      .moveTo(leftX, tableY + 15)
      .lineTo(550, tableY + 15)
      .stroke();

    doc
      .font("Helvetica")
      .fontSize(12)
      .text(payment.orderNote || "Course BSC IT", leftX, tableY + 20)
      .text(`₹${payment.orderAmount}/-`, rightX, tableY + 20);

    // === TOTAL ===
    const totalY = tableY + 60;
    doc
      .moveTo(leftX, totalY - 20)
      .lineTo(550, totalY - 20)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Total", centerX + 50, totalY - 15)
      .text(`₹${payment.orderAmount}/-`, rightX, totalY - 15);

    doc.moveTo(leftX, totalY).lineTo(550, totalY).stroke();

    // === BOTTOM BLANK SPACE ===
    doc.moveDown(0); // Add empty space for future branding, signature, etc.

    // === FOOTER ===
    const footerY = doc.page.height - 50;

    // if (hasLogo) {
    //   doc.image(logoPath, leftX, footerY - 40, { width: 50 });
    // }

    doc
      .fontSize(10)
      .fillColor("gray")
      .text("© 2025 Vidyarishi.com — All rights reserved", 50, footerY - 30, {
        align: "center",
      });

    doc.fillColor("#007BFF").text("https://vidyarishi.com", 50, footerY - 15, {
      align: "center",
      link: "https://vidyarishi.com",
      underline: true,
    });

    doc.end();
  } catch (error) {
    console.error("Error generating receipt:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
