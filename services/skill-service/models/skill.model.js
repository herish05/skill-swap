import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    authUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    skillName: {
      type: String,
      required: true,
      trim: true,
      index:true
    },

    category: {
      type: String,
      required: true,
      index:true
    },

    type: {
      type: String,
      enum: ["OFFERED", "WANTED"],
      required: true,
      index:true
    },

    level: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"],
      required: true,
    },

    experienceYears: {
      type: Number,
      min: 0,
      max: 50,
    },

    isPublic: {
      type: Boolean,
      default: true,
      index:true
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
skillSchema.index({skillName:"text",category:"text",tags:"text"});
export default mongoose.model("Skill", skillSchema);
