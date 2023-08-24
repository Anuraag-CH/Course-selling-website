import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "@/db";
import { SECRET } from "@/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Find the admin by username
      const admin = await Admin.findOne({ username });

      if (!admin) {
        res.status(403).json({ message: "Invalid username " });
        return;
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        res.status(403).json({ message: "Invalid password" });
        return;
      }

      // Generate a token
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60}; SameSite=Strict`
      );

      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
