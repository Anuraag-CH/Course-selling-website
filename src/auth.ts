import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { SECRET } from "./config";

export default async function checkAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the 'token' cookie exists
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    jwt.verify(token, SECRET, async (err, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Token verification failed" });
      }
      req.headers.username = user.username;
      req.headers.role = user.role;
    });
  } catch (err) {
    console.log(err);
  }
}
