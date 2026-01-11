import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://core:core@localhost:27017/core?authSource=core");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}