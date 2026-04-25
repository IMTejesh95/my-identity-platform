import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  ISSUER: process.env.ISSUER || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL!,
  JWK_BASE64: process.env.JWKS_BASE64!,
};
