// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import checkAuth from "@/auth";
import { Admin } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  checkAuth(req, res);
  const username = req.headers.username;
  const role = req.headers.role;
  const admin = await Admin.findOne({ username: username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
}
