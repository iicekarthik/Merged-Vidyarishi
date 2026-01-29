import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    // 🔐 ORIGINAL (LOCKED – NEVER UPDATE)
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    // 🖼️ PROFILE PHOTO
    profilePhoto: {
      url: String,
      public_id: String,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ✅ ALTERNATE CONTACT (UPDATABLE)
    alternatePhone: { type: String },
    alternateEmail: { type: String },

    // 👤 BASIC INFO
    fullName: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },
    state: { type: String },
    city: { type: String },

    // 🧠 PROFILE
    skill: { type: String },
    biography: { type: String, maxlength: 500 },

    // 🌐 SOCIAL
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String },
    github: { type: String },

    // 🔐 SYSTEM
    role: { type: String, default: "admin" },
    isAdmin: { type: Boolean, default: true },
    isPhoneNumberVerified: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },

    // 📧 EMAIL OTP (for email login verification)
    emailOtp: {
      type: String,
    },

    emailOtpExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", adminSchema);