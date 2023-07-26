import * as jose from "jose";

const TRUNCATE_PD = true;
const RSA_KEY = process.env.DATA_PUBLIC_KEY as string;

const PUBLIC_KEY =
  "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXCtvvBvelxFjupdpSEGoGKOOn+m/IuUr0eHxDppkbKFz/y073M1q5AjXGRzzlFYBCAha4NWO60b/jEnm1CSzBgCPgPLidHBQ0PQ1b/9EyfBM3QtVHJATzhx+SaoPNIOe3XOyJVBdFt76MfU8lvF1YUi11NznsCB90DYMcUchcYdrTx6UqayuTq/kOy5hoxwCLCJaFaJjKZ+bmiAY1Z/yn6fng6RMGaiuwH9CSSQSqiGmEc0pkVwB87ixymlVDt/Y8QH1JJdddpM7AxewYJfuO5JqsLVnYygHiU582oB4lkzOtWcZcu6817CL5J2mRrIP9oCR+W5FlhdsNgVH1u1mwIDAQAB-----END PUBLIC KEY-----";

export const parsePd = (data: Record<string, string>) => {
  if (!TRUNCATE_PD) {
    return {
      nric: data["myinfo.nric_number"].slice(-4),
      name: data["myinfo.name"],
      mobile: data["myinfo.mobile_number"],
    };
  } else {
    //replace data with the following:
    //nric: last character
    //name: first character
    //mobile: last 2 characters
    return {
      nric: data["myinfo.nric_number"].slice(-1),
      name: data["myinfo.name"].slice(0, 1),
      mobile: data["myinfo.mobile_number"].slice(-2),
    };
  }
};

export const parseVehiclePd = (vehicleNo: string) => {
  if (TRUNCATE_PD) {
    //return only last character
    return vehicleNo.slice(-1);
  }
  return vehicleNo;
};

export const encryptPd = async (data: string) => {
  if (!RSA_KEY) {
    console.log("key not found");
    return {};
  }
  try {
    const jwk = await jose.importSPKI(RSA_KEY, "RS256");
    // const jwk = await jose.importX509(RSA_KEY, "RS256");
    const jwe = await new jose.FlattenedEncrypt(new TextEncoder().encode(data))
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(jwk);
    return jwe;
  } catch (e) {
    const error = e as Error;
    console.log("unable to encrypt");
    console.log(error.message);
  }

  return {};
};

export const encryptText = async (data: string): Promise<string> => {
  if (!RSA_KEY) {
    console.log("key not found");
    return "";
  }
  try {
    const publicKey = await jose.importSPKI(RSA_KEY, "RSA-OAEP-256");
    const encryptedString = await new jose.CompactEncrypt(
      new TextEncoder().encode(data)
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(publicKey);
    return encryptedString;
  } catch (e) {
    const error = e as Error;
    console.log("unable to encrypt");
    console.log(error.message);
  }

  return "";
};
