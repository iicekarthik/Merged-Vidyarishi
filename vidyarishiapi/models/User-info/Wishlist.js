// models/Wishlist.js
import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // JSON course id (number)
    courseId: {
      type: Number,
      required: true,
    },

    // courseId: {
    //   type: String,   // store Mongo _id here
    //   required: true,
    // },

    courseTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicate wishlist per user per course
WishlistSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
