import * as jose from "jose";
import { PdInfo } from "../@types/pd";

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_DATA_KEY as string;

export const decryptString = async (jwe: string) => {
  const privateKey = await jose.importPKCS8(PRIVATE_KEY, "RSA-OAEP-256");
  const { plaintext, protectedHeader } = await jose.compactDecrypt(
    jwe,
    privateKey
  );

  return new TextDecoder().decode(plaintext);
};

export const decryptFlatJson = async (jwe: jose.FlattenedJWE) => {
  const privateKey = await jose.importPKCS8(PRIVATE_KEY, "RSA-OAEP-256");
  const { plaintext, protectedHeader } = await jose.flattenedDecrypt(
    jwe,
    privateKey
  );

  return JSON.parse(new TextDecoder().decode(plaintext)) as PdInfo;
};
