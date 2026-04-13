import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/server/model/UserModel/User.model";

const MONGO_URI = process.env.MONGO_URI;

const migrateUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Mongo connected");

    const users = await User.find();

    for (let user of users) {
      let updated = false;

      // 🔄 username → name
      if (user.username && !user.name) {
        user.name = user.username;
        user.username = undefined;
        updated = true;
      }

      // 🔐 Hash password if still plain text
      if (user.password && !user.password.startsWith("$2b$")) {
        user.password = await bcrypt.hash(user.password, 10);
        updated = true;
      }

      // 🔄 Role mapping
      const validRoles = ["super_admin", "admin", "staff", "user"];

      if (!validRoles.includes(user.role)) {
        if (user.role === "reader") {
          user.role = "user";
        } else {
          user.role = "user"; // fallback safety
        }
        updated = true;
      }

      // ➕ Add missing fields (safe defaults)
      if (!user.profileImage) {
        user.profileImage = "";
        updated = true;
      }

      if (!Array.isArray(user.likedNews)) {
        user.likedNews = [];
        updated = true;
      }

      if (!Array.isArray(user.bookmarks)) {
        user.bookmarks = [];
        updated = true;
      }

      if (user.isVerified === undefined) {
        user.isVerified = false;
        updated = true;
      }

      if (!user.status) {
        user.status = "active";
        updated = true;
      }

      // ⏱ lastLogin (optional)
      if (!user.lastLogin) {
        user.lastLogin = null;
        updated = true;
      }

      if (updated) {
        await user.save();
        console.log(`🚀 Migrated: ${user.email}`);
      }
    }

    console.log("🎉 Migration completed successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

migrateUsers();