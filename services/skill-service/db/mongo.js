import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Skill Service MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    
  }
};
