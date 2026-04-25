import express from "express";
import pinoHttp from "pino-http";
import interactionRoutes from "./modules/auth/interaction.routes";
import protectedRoutes from "./modules/api/protected.routes";
import { logger } from "./plugins/logger";

export function buildApp() {
  const app = express();

  // Logging middleware
  app.use(pinoHttp({ logger }));

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health endpoint
  app.get("/health", (_, res) => {
    res.json({ status: "ok" });
  });

  // Auth routes
  app.use("/interaction", interactionRoutes);
  app.use("/api", protectedRoutes);

  return app;
}
