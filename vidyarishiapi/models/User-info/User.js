import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔐 ORIGINAL (LOCKED – NEVER UPDATE)
    phone: { type: String, required: true, unique: true },

    profileImage: {
      url: String,
      public_id: String,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,   // ⭐ VERY IMPORTANT
    },

    // ✅ ALTERNATE CONTACT (UPDATABLE)
    alternatePhone: { type: String },
    alternateEmail: { type: String },

    fullName: { type: String },
    qualification: { type: String },
    course: { type: String },
    dob: { type: Date },
    gender: { type: String },
    state: { type: String },
    city: { type: String },

    whatsapp: { type: Boolean, default: false },

    skill: { type: String },
    biography: { type: String, trim: true, maxlength: 500 },

    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String },
    github: { type: String },

    isPhoneNumberVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },

    leadStatus: {
      type: String,
      enum: ["new", "contacted", "on_hold", "converted"],
      default: "new",
    },

    remark: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    
    lastLoginAt: {
      type: Date,
      default: null,
    },

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
