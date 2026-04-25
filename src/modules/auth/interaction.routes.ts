import { Router } from "express";
import {
  getInteraction,
  postConsent,
  postLogin,
} from "./interaction.controller";

const router = Router();

router.get("/:uid", getInteraction);
router.post("/:uid/login", postLogin);
router.post(":uid/consent", postConsent);

export default router;
