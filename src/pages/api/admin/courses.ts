import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Course } from "@/db";

const SECRET = "your-secret-key"; // Replace with your actual secret key

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cookieHeader = req.headers.cookie;

      const getAllTokenValues = () => {
        const cookies = cookieHeader ? cookieHeader.split("; ") : [];
        const tokenCookies = cookies.filter((cookie) =>
          cookie.startsWith("token=")
        );
        const tokenValues = tokenCookies.map((tokenCookie) => {
          const [, tokenWithValue] = tokenCookie.split("=");
          // Split again if there's additional data after the token
          const [token] = tokenWithValue.split("split");
          return token;
        });
        return tokenValues;
      };

      // Extract all token values
      const allTokens = getAllTokenValues();

      if (allTokens.length > 0) {
        const lastToken = allTokens[allTokens.length - 1];

        jwt.verify(lastToken, SECRET, async (err, user) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Token verification failed" });
          }

          const courses = await Course.find({});
          res.json({ courses });
        });
      } else {
        res.status(401).json({ message: "Tokens not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
