// import mongoose , { Document, Schema } from 'mongoose';
// import {ROLE_VALUES,ROLES} from '@/lib/constants';
//import bcrypt  from 'bcryptjs';

// export interface User extends Document {
//     username: string;
//     email: string;
//     password: string;
//     role: string;
//     comparePassword(password: string): Promise<boolean>;

// }

// const UserSchema: Schema = new Schema({
//     username: { type: String, required: true, unique: true },
//     email: {
//          type: String, required: true, unique: true, match:  [/^\S+@\S+\.\S+$/, 'Invalid email address'] },
//     password: {
//         type: String, required: true
//     },
//     role:{
//         type: String,
//         enum: ROLE_VALUES,
//         default: ROLES.READER
//     }
// });

// UserSchema.pre("save", async function (this: User) {
//   if (!this.isModified("password")) return;

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// UserSchema.methods.comparePassword = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };

// export default mongoose.models.User || mongoose.model<User>('User', UserSchema);

// import mongoose, { Document, Schema } from "mongoose";
// import { ROLE_VALUES, ROLES } from "@/lib/constants";

// export interface User extends Document {
//   username: string;
//   email: string;
//   password: string;
//   text_password: string;
//   role: (typeof ROLE_VALUES)[number];
//   avatarUrl: string;
//   bio: string;
// }

// const UserSchema: Schema<User> = new Schema(
//   {
//     username: { type: String, required: true, unique: true, trim: true },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },

//     text_password: {
//       type: String,
//       required: true,
//       select: false,
//     },

//     role: {
//       type: String,
//       enum: ROLE_VALUES,
//       default: ROLES.USER,
//     },

//     avatarUrl: {
//       type: String,
//       default: "",
//     },

//     bio: {
//       type: String,
//       default: "",
//     },
//   },
//   { timestamps: true }
// );

// // 🔥 Indexes
// UserSchema.index({ email: 1 });
// UserSchema.index({ username: 1 });

// export default mongoose.models.User ||
//   mongoose.model<User>("User", UserSchema);

import mongoose, { Document, Schema } from "mongoose";
import { ROLE_VALUES, ROLES } from "@/lib/constants";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  text_password:string;
  role: string;
  avatarUrl: string;
  bio: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // IMPORTANT
    },
     text_password: {
      type: String,
      required: true,
      select: false,  
    },

    role: {
      type: String,
      enum: ROLE_VALUES,
      default: ROLES.USER,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
