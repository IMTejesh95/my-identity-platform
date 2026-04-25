import { Provider } from "oidc-provider";
import { env } from "./env";

export const jwk = JSON.parse(
  Buffer.from(env.JWK_BASE64, "base64").toString("utf-8"),
);

export const oidc = new Provider(env.ISSUER!, {
  clients: [
    {
      client_id: "test-client",
      client_secret:
        "9f3c8b6a7d2e4f1c8a9b0e5d7c3f2a1b6e4d9c8f7a2b3c4d5e6f7a8b9c0d1e2f",
      redirect_uris: ["https://oidcdebugger.com/debug"],
      grant_types: ["authorization_code"],
      response_types: ["code"],
      token_endpoint_auth_method: "client_secret_basic",
    },
  ],

  pkce: {
    required(ctx, client) {
      return true;
    },
  },

  interactions: {
    url(ctx, interaction) {
      return `/interactions/${interaction.uid}`;
    },
  },

  findAccount: async (ctx, id) => {
    return {
      accountId: id,
      async claims() {
        return {
          sub: id,
          // email: 'user@example.com'
        };
      },
    };
  },

  claims: {
    openid: ["sub"],
    email: ["email"],
  },

  // jwks: {
  //   keys: [jwk],
  // },
});
