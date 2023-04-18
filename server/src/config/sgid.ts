import SgidClient from "@opengovsg/sgid-client";

const clientConfig = {
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  privateKey: process.env.PRIVATE_KEY as string,
  redirectUri: "http://localhost:5173/loginCallback",
};

const client = new SgidClient(clientConfig);

export default client;
