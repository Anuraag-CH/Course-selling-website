import mongoose from "mongoose";

import { MONGO_URL } from "@/config";

async function connectDB() {
  try {
    const connection = await mongoose.connect(MONGO_URL, {
      dbName: "courses",
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

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
