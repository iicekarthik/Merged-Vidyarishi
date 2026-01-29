// import dbConnect from "@/vidyarishiapi/config/db";
// import Course from "@/vidyarishiapi/models/Courses-info/Course";
// import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";

// export default async function handler(req, res) {
//   if (req.method !== "PUT")
//     return res.status(405).json({ message: "Method Not Allowed" });

//   await dbConnect();
//   adminAuth(req);

//   const { courseId, meta, courseOverview } = req.body;

//   const course = await Course.findOneAndUpdate(
//     { courseId },
//     { meta, courseOverview },
//     { new: true }
//   );

//   res.json({ success: true, course });
// }
import dbConnect from "@/vidyarishiapi/config/db";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { adminAuth } from "@/vidyarishiapi/middleware/adminAuth";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();
  adminAuth(req);

  const { courseId, meta, courseOverview } = req.body;

  const updateData = {};

  /* ======================
     HERO TEXT UPDATE
  ====================== */
  if (meta?.hero?.subtitle) {
    updateData["meta.hero.subtitle"] = meta.hero.subtitle;
  }

  if (meta?.hero?.placement) {
    updateData["meta.hero.placement"] = meta.hero.placement;
  }

  /* ======================
     BANNER IMAGE UPDATE
  ====================== */
  if (meta?.hero?.bannerImage?.url) {
    updateData["meta.hero.bannerImage"] = meta.hero.bannerImage;
  }

  /* ======================
     BROCHURE UPDATE
  ====================== */
  if (meta?.brochure?.url) {
    updateData["meta.brochure"] = meta.brochure;
  }

  /* ======================
     COURSE OVERVIEW
  ====================== */
  if (courseOverview) {
    updateData.courseOverview = courseOverview;
  }

  /* ======================
   ELIGIBILITY
====================== */
  if (meta?.eligibility !== undefined) {
    updateData["meta.eligibility"] = meta.eligibility;
  }

  /* ======================
     AVERAGE SALARY
  ====================== */
  if (meta?.averageSalary !== undefined) {
    updateData["meta.averageSalary"] = meta.averageSalary;
  }

  /* ======================
     EMI AVAILABLE
  ====================== */
  if (meta?.emiAvailable !== undefined) {
    updateData["meta.emiAvailable"] = meta.emiAvailable;
  }

  /* ======================
     CAREER SCOPE
  ====================== */
  if (meta?.careerScope) {
    updateData["meta.careerScope"] = meta.careerScope;
  }

  /* ======================
     FAQ
  ====================== */
  if (meta?.faq) {
    updateData["meta.faq"] = meta.faq;
  }

  const course = await Course.findOneAndUpdate(
    { courseId },        // IMPORTANT: not _id
    { $set: updateData },
    { new: true }
  );

  res.status(200).json({
    success: true,
    course,
  });
}
