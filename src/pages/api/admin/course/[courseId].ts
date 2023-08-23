import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "@/db"; // Import your Course model
import checkAuth from "@/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      checkAuth(req, res);
      const courseId = req.query.courseId as string;
      const course = await Course.findById(courseId);
      if (course) {
        res.json({ course });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else if (req.method === "PUT") {
    try {
      checkAuth(req, res);
      const courseId = req.query.courseId as string;
      const course = await Course.findByIdAndUpdate(courseId, req.body, {
        new: true,
      });
      if (course) {
        res.json({ message: "Course updated successfully" });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
