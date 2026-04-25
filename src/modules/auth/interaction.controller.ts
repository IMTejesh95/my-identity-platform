import { Request, Response } from "express";
import { oidc } from "../../config/oidc";
import { UserService } from "../users/user.service";

const userService = new UserService();

/**
 * Step 1: Render interaction (login or consent)
 */
export async function getInteraction(req: Request, res: Response) {
  const { uid } = req.params;
  const details = await oidc.interactionDetails(req, res);
  const prompt = details.prompt;

  if (prompt.name === "login") {
    return res.json({
      type: "login",
      uid,
      details,
    });
  }

  if (prompt.name === "consent") {
    return res.json({
      type: "consent",
      uid,
      details,
    });
  }

  return res.status(400).send("Unknown interaction");
}

export async function postLogin(req: Request, res: Response) {
  const { uid } = req.params;
  const { email, password } = req.body;

  const user = await userService.validateUser(email, password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const result = {
    login: {
      accountId: user.id,
    },
  };

  await oidc.interactionFinished(req, res, result, {
    mergeWithLastSubmission: false,
  });
}

export async function postConsent(req: Request, res: Response) {
  const { uid } = req.params;
  const details = await oidc.interactionDetails(req, res);

  const result = {
    consent: {},
  };

  await oidc.interactionFinished(req, res, result, {
    mergeWithLastSubmission: true,
  });
}
