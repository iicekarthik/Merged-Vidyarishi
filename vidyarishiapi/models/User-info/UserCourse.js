import mongoose from "mongoose";

const userCourseSchema = new mongoose.Schema(
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

    enrolledAt: {
      type: Date,
      default: Date.now
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Prevent duplicate enrollment
userCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.UserCourse ||
  mongoose.model("UserCourse", userCourseSchema);
