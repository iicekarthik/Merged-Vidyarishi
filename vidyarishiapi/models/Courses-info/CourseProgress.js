import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    courseId: {
      type: Number,
      required: true
    },

    completedVideos: {
      type: [String], // videoId[]
      default: []
    },

    completedSections: {
      type: [String], // sectionId[]
      default: []
    },

    progressPercent: {
      type: Number,
      default: 0
    },

    isCompleted: {
      type: Boolean,
      default: false
    },

    certificateIssued: {
      type: Boolean,
      default: false
    },

    completedAt: {
      type: Date,
      default: null
    },

    quizPassed: {
      type: Boolean,
      default: false
    },

    quizScore: {
      type: Number,
      default: 0
    }


  },
  { timestamps: true }
);

// One progress doc per user per course
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.CourseProgress ||
  mongoose.model("CourseProgress", courseProgressSchema);
