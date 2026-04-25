import { jwtVerify } from "jose";
import { jwk } from "../../config/oidc";

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, jwk);
  return payload;
}
