import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    // expiresAt: { type: Date, required: true },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // ✅ TTL index
    },
  },
  { timestamps: true }
);

export default mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", refreshTokenSchema);
