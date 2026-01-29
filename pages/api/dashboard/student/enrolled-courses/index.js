// import dbConnect from "@/vidyarishiapi/config/db";
// import EnrolledCourse from "@/vidyarishiapi/models/EnrolledCourse";
// import Course from "@/vidyarishiapi/models/Course"; 
// import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";
// import { parse } from "cookie";
// import { AppError, errorHandler } from "@/vidyarishiapi/lib/errorHandler";

// async function handler(req, res) {
//   await dbConnect();

//   if (req.method !== "GET") {
//     throw new AppError("Method Not Allowed", 405);
//   }

//   const cookies = parse(req.headers.cookie || "");
//   const token = cookies.accessToken;

//   if (!token) {
//     throw new AppError("Unauthorized", 401);
//   }

//   const decoded = verifyAccessToken(token);
//   const userId = decoded?.id;

// const courses = await EnrolledCourse.find({ userId })
//   .populate("courseId")
//   .sort({ createdAt: -1 });
//   //DB query: is user ke sabhi enrolled records laao, naya se pehle (descending createdAt)

//   return res.status(200).json(courses);
// }

// export default errorHandler(handler);

import dbConnect from "@/vidyarishiapi/config/db";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;

  // 1️⃣ Fetch progress
  const progressDocs = await CourseProgress.find({ userId });

  if (!progressDocs.length) {
    return res.status(200).json([]);
  }

  // 2️⃣ Fetch course details
  const courseIds = progressDocs.map((p) => p.courseId);

  const courses = await Course.find({
    courseId: { $in: courseIds },
    isPublished: true,
  });

  // 3️⃣ Merge course + progress
  const response = progressDocs
    .map((p) => {
      const course = courses.find((c) => c.courseId === p.courseId);
      if (!course) return null;

      // ✅ SINGLE source of truth
      const isCourseCompleted =
        p.isCompleted === true || p.quizPassed === true;

      return {
        ...course.toObject(),

        // LMS fields
        progress: p.progressPercent,

        status: isCourseCompleted
          ? "completed"
          : p.progressPercent === 0
            ? "enrolled"
            : "active",

        // ✅ Completion flags
        isCompleted: isCourseCompleted,
        completedVideos: p.completedVideos || [],
        completedSections: p.completedSections || [],
        completedAt:
          p.completedAt ||
          (p.quizPassed ? p.updatedAt : null),


        // Quiz & certificate
        quizPassed: p.quizPassed === true,
        quizScore: p.quizScore || 0,
        certificateIssued: p.certificateIssued === true,
      };
    })
    .filter(Boolean);

  // const response = progressDocs
  //   .map((p) => {
  //     const course = courses.find((c) => c.courseId === p.courseId);
  //     if (!course) return null;

  //     return {
  //       ...course.toObject(),

  //       // LMS fields
  //       progress: p.progressPercent,
  //       status:
  //         p.progressPercent === 0
  //           ? "enrolled"
  //           : p.progressPercent < 100
  //             ? "active"
  //             : "completed",

  //       // ✅ ADD THESE (CRITICAL)
  //       isCompleted: p.isCompleted === true,
  //       completedVideos: p.completedVideos || [],
  //       completedSections: p.completedSections || [],
  //       completedAt: p.completedAt || null,

  //       // ✅ ADD THESE
  //       quizPassed: p.quizPassed === true,
  //       quizScore: p.quizScore || 0,
  //       certificateIssued: p.certificateIssued === true,
  //     };
  //   })
  //   .filter(Boolean);

  // const response = progressDocs
  //   .map((p) => {
  //     const course = courses.find((c) => c.courseId === p.courseId);
  //     if (!course) return null;

  //     return {
  //       ...course.toObject(),

  //       // LMS fields
  //       progress: p.progressPercent,
  //       status:
  //         p.progressPercent === 0
  //           ? "enrolled"
  //           : p.progressPercent < 100
  //             ? "active"
  //             : "completed",

  //       // ✅ ADD THESE (CRITICAL)
  //       isCompleted: p.isCompleted === true,
  //       completedVideos: p.completedVideos || [],
  //       completedSections: p.completedSections || [],
  //       completedAt: p.completedAt || null,

  //       // ✅ ADD THESE
  //       quizPassed: p.quizPassed === true,
  //       quizScore: p.quizScore || 0,
  //       certificateIssued: p.certificateIssued === true,
  //     };
  //   })
  //   .filter(Boolean);

  res.status(200).json(response);
});
