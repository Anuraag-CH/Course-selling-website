// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  console.log(req.query);
  res.status(200).send("hello");
}

// router.get("/me", authenticateJwt, async (req, res) => {
//     const admin = await Admin.findOne({ username: req.user.username });
//     if (!admin) {
//       res.status(403).json({msg: "Admin doesnt exist"})
//       return
//     }
//     res.json({
//         username: admin.username
//     })
// });
