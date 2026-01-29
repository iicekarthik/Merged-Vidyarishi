import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    otp: { type: String, required: true },

    // expires in 5 minutes
    expiresAt: { type: Date, required: true },

    // track attempts
    attempts: { type: Number, default: 0 },

    // lock the OTP after max attempts
    locked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 
// MongoDB auto-removes expired docs

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
