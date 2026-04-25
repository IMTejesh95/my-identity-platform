import { buildApp } from "./app";
import { env } from "./config/env";
import { oidc } from "./config/oidc";

async function start() {
  const app = buildApp();

  /**
   * CRITICAL:
   * OIDC must be mounted BEFORE error handlers
   */
  app.use("/oidc", oidc.callback());

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
    console.log(`OIDC issuer: ${env.ISSUER}/oidc`);

    console.log(env);
  });
}

start();
