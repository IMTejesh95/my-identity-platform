import { generateKeyPair } from "jose";

export async function generateKeys() {
  const { publicKey, privateKey } = await generateKeyPair("RS256");

  return { publicKey, privateKey };
}
