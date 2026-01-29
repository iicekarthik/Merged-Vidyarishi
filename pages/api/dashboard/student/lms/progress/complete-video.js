import dbConnect from "@/vidyarishiapi/config/db";
import CourseProgress from "@/vidyarishiapi/models/Courses-info/CourseProgress";
import CourseContent from "@/vidyarishiapi/models/Courses-info/CourseContent";
import { authMiddleware } from "@/vidyarishiapi/middleware/authMiddleware";

export default authMiddleware(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  const userId = req.user.id;
  const { courseId, sectionId, videoId } = req.body;

  if (!courseId || !sectionId || !videoId) {
    return res.status(400).json({
      message: "courseId, sectionId, and videoId are required",
    });
  }

  // 1️⃣ Fetch course progress
  const progress = await CourseProgress.findOne({ userId, courseId });
  if (!progress) {
    return res.status(404).json({ message: "Progress not found" });
  }

  // 2️⃣ Avoid duplicate video completion
  if (!progress.completedVideos.includes(videoId)) {
    progress.completedVideos.push(videoId);
  }

  // 3️⃣ Fetch course content to calculate totals
  const content = await CourseContent.findOne({ courseId });
  if (!content) {
    return res.status(404).json({ message: "Course content not found" });
  }

  const section = content.sections.find(
    (sec) => sec.sectionId === sectionId
  );

  if (!section) {
    return res.status(404).json({ message: "Section not found" });
  }

  // 4️⃣ Check if section is completed
  const sectionVideoIds = section.videos.map((v) => v.videoId);
  const completedInSection = sectionVideoIds.every((id) =>
    progress.completedVideos.includes(id)
  );

  if (completedInSection && !progress.completedSections.includes(sectionId)) {
    progress.completedSections.push(sectionId);
  }

  // 5️⃣ Calculate progress %
  const totalVideos = content.sections.reduce(
    (acc, sec) => acc + sec.videos.length,
    0
  );

  const completedCount = progress.completedVideos.length;

  const progressPercent = Math.round(
    (completedCount / totalVideos) * 100
  );

  progress.progressPercent = progressPercent;

  // 6️⃣ Auto-complete course (SAFE)
  if (progressPercent === 100) {
    progress.isCompleted = true;

    // ✅ set completedAt ONLY ONCE
    if (!progress.completedAt) {
      progress.completedAt = new Date();
    }
  }


  await progress.save();

  return res.status(200).json({
    success: true,
    progress: {
      completedVideos: progress.completedVideos,
      completedSections: progress.completedSections,
      progressPercent: progress.progressPercent,
      isCompleted: progress.isCompleted,
    },
  });
});