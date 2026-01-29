// models/QuizAttempt.js
import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    // ✅ FIXED
    courseId: {
      type: Number,
      required: true,
      index: true,
    },

    selectedAnswers: {
      type: Object,
      default: {},
    },

    quizTitle: String,
    totalQuestions: Number,
    correctAnswers: Number,
    totalMarks: Number,
    score: Number,
    result: { type: String, enum: ["Pass", "Fail"] },
  },

  { timestamps: true }
);

export default mongoose.models.QuizAttempt ||
  mongoose.model("QuizAttempt", QuizAttemptSchema);
