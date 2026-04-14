import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    console.log("ENV CHECK:", MONGODB_URI); // debug

    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI missing");
    }

    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ DB ERROR:", error);
  }
};