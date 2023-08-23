import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "@/db";
import checkAuth from "@/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    checkAuth(req, res);
    const courses = await Course.find({});
    res.json({ courses });
  }
  if (req.method === "POST") {
    checkAuth(req, res);
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course.id });
  }
}
