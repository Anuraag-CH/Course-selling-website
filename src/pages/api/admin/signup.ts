import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Admin } from "@/db";
import { SECRET } from "@/config";
import connectDB from "@/db";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Check if an admin with the given username already exists
      const existingAdmin = await Admin.findOne({ username });

      if (existingAdmin) {
        res.status(403).json({ message: "Admin already exists" });
      } else {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        // Generate a token
        const token = jwt.sign({ username, role: "admin" }, SECRET, {
          expiresIn: "1h",
        });

        res.setHeader(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=${
            60 * 60
          }; SameSite=Strict`
        );

        res.status(200).json({ message: "Admin created successfully" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
