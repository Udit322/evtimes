import mongoose from "mongoose";

// 🔥 TEMP FIX (direct paste)
const MONGODB_URI =
  "mongodb://akshaysharma6911_db_user:xqiszuupDxSswOYm@ac-mjskurw-shard-00-00.ohygwqq.mongodb.net:27017,ac-mjskurw-shard-00-01.ohygwqq.mongodb.net:27017,ac-mjskurw-shard-00-02.ohygwqq.mongodb.net:27017/evtimes?ssl=true&replicaSet=atlas-87nwrh-shard-0&authSource=admin";

export const connectDB = async () => {
  try {
    console.log("USING HARDCODE URI");

    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ DB ERROR:", error);
  }
};