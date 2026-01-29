import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  courseName: String,

  // 🏷️ Enquiry status
  status: {
    type: String,
    enum: ["new", "contacted"],
    default: "new",
  },

  // 🔄 Conversion tracking
  convertedToLead: {
    type: Boolean,
    default: false,
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", enquirySchema);
