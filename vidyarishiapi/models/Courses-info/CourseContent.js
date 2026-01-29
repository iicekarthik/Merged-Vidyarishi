import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: String },
  order: { type: Number }
});

const sectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number },
  videos: [videoSchema]
});

const quizSchema = new mongoose.Schema({
  questions: [
    {
      id: String,
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String,
    }
  ]
});

const courseContentSchema = new mongoose.Schema(
  {
    courseId: {
      type: Number,
      required: true,
      index: true
    },

    contentType: {
      type: String,
      enum: ["sections", "quizOnly"],
      default: "sections"
    },
    sections: [sectionSchema],
    quiz: quizSchema
  },
  { timestamps: true }
);

export default mongoose.models.CourseContent ||
  mongoose.model("CourseContent", courseContentSchema);
