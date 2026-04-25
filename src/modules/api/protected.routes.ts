import { Request, Response, Router } from "express";
import { verifyAccessToken } from "../tokens/token.service";

const router = Router();

router.get("/profile", async (req: Request, res: Response) => {
  try {
    const authheader = req.headers.authorization;
    if (!authheader) return res.status(401).json({ error: "Missing token" });

    const payload = await verifyAccessToken(authheader.split(" ")[1]);
    res.json({
      message: "Access granted",
      user: payload,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
