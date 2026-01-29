import dbConnect from "@/vidyarishiapi/config/db";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import QuizAttempt from "@/vidyarishiapi/models/User-info/QuizAttempt";
import Course from "@/vidyarishiapi/models/Courses-info/Course";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;
  const {
    courseId,
    quizScore,
    totalQuestions,
    correctAnswers,
    selectedAnswers,
  } = req.body;


  if (!courseId || quizScore === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  // ✅ FETCH COURSE (FIX)
  const course = await Course.findOne({ courseId });

  // ✅ SAVE ATTEMPT
  await QuizAttempt.create({
    userId,
    courseId,
    courseTitle: course?.title || "Course",
    quizTitle: "Final Quiz",
    totalQuestions,
    correctAnswers,
    totalMarks: totalQuestions,
    score: quizScore,
    result: quizScore >= 60 ? "Pass" : "Fail",
    selectedAnswers: selectedAnswers || {}, // ✅ SAFE
  });

  // ✅ UPDATE PROGRESS ONLY IF PASSED
  const progress = await CourseProgress.findOne({ userId, courseId });
  if (progress && quizScore >= 60) {
    progress.quizPassed = true;
    progress.quizScore = quizScore;
    progress.isCompleted = true;
    await progress.save();
  }

  return res.status(200).json({ success: true });
});


// import dbConnect from "@/vidyarishiapi/config/db";
// import CourseProgress from "@/vidyarishiapi/models/Admin-info/Courses-info/CourseProgress";
// import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

// export default authMiddleware(async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   await dbConnect();

//   const userId = req.user.id; // ✅ comes from middleware
//   const { courseId, quizScore } = req.body;

//   if (!courseId || quizScore === undefined) {
//     return res.status(400).json({ message: "courseId and quizScore required" });
//   }

//   const progress = await CourseProgress.findOne({
//     userId,
//     courseId,
//   });

//   if (!progress) {
//     return res.status(404).json({ message: "Progress not found" });
//   }

//   progress.quizPassed = true;
//   progress.quizScore = quizScore;
//   progress.isCompleted = true;

//   //   progress.quizScore = quizScore;
//   // progress.quizPassed = quizScore >= 60; // optional
//   // progress.isCompleted = true;


//   await progress.save();

//   return res.status(200).json({
//     success: true,
//     progress,
//   });
// });
