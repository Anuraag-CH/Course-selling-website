import mongoose from "mongoose";

import { MONGO_URL } from "@/config";
mongoose.connect(MONGO_URL, {
  dbName: "courses",
});

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
export const Admin =
  mongoose.models.admins || mongoose.model("admins", adminSchema);
export const Course =
  mongoose.models.courses || mongoose.model("courses", courseSchema);
