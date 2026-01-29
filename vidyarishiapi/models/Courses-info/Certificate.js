import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
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

    certificateId: {
      type: String,
      required: true,
      unique: true
    },

    issuedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);
