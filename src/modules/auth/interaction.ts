import { Router, Request, Response } from "express";
import { UserService } from "../users/user.service";

const router = Router();
const userService = new UserService();

/**
 * NOTE:
 * This is NOT yet wired into OIDC interaction flow.
 * This is your authentication endpoint.
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({
      success: true,
      userId: user.id,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const interactionRoutes = router;
