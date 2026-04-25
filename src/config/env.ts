import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  ISSUER: process.env.ISSUER || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL!,
  TEST_CLIENT_SECRET: process.env.TEST_CLIENT_SECRET,
  JWK_BASE64: process.env.JWKS_BASE64!,
};
