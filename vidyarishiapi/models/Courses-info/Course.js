// models/Course.js
import mongoose from "mongoose";

const overviewListSchema = new mongoose.Schema({
  listItem: { type: String, required: true }
});

const courseOverviewSchema = new mongoose.Schema({
  title: { type: String, default: "Course Overview" },
  desc: { type: String, default: "" },
  descTwo: { type: String, default: "" },
  overviewList: [overviewListSchema]
});

// const requirementItemSchema = new mongoose.Schema({
//   listItem: { type: String, required: true }
// });

// const courseRequirementSchema = new mongoose.Schema({
//   title: { type: String, default: "Requirements" },
//   requirements: [requirementItemSchema]
// });

const CourseSchema = new mongoose.Schema(
  {
    // courseId: { type: String, required: true, unique: true, index: true },

    courseId: {
      type: Number,
      required: true,
      unique: true, index: true
    },

    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String },
    courseType: {
      type: String,
      enum: ["featured", "popular", "latest"],
      default: "latest",
    },

    courseImg: {
      url: String,
      public_id: String,
    },

    coursePrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },

    lectures: { type: Number, default: 0 },
    // enrolledStudent: { type: Number, default: 0 },

    // rating: { type: Number, default: 0 },
    // totalReviews: { type: Number, default: 0 },

    meta: {
      hero: {
        subtitle: String,
        placement: String,
        bannerImage: {
          url: String,
          public_id: String,
        },
      },
      brochure: {
        url: String,
        public_id: String,
      },
      eligibility: String,
      averageSalary: String,
      emiAvailable: Boolean,
      careerScope: Object,
      faq: Object,
    },

    isPublished: { type: Boolean, default: false },

    // ✅ NEW (USED BY UI)
    courseOverview: {
      type: [courseOverviewSchema],
      default: []
    },
    // courseRequirement: {
    //   type: [courseRequirementSchema],
    //   default: []
    // },

  },
  { timestamps: true }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);