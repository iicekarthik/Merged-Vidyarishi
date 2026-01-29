import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // 🔥 CHANGE THIS
        courseId: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

// 🔒 Prevent duplicate cart items per user
cartSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
