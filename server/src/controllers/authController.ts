import SgidClient from "@opengovsg/sgid-client";

const client = new SgidClient({
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  privateKey: process.env.PRIVATE_KEY as string,
  redirectUri: "http://localhost:3000/api/login",
});

const generateUrl = (req: any, res: any) => {
  const url = client.authorizationUrl(
    "state",
    process.env.SCOPE as string,
    null
  );

  res.status(200).json(url);
};

const login = async (req: any, res: any) => {
  const { code } = req.query;
  const { accessToken } = await client.callback(code, null);
  const { data } = await client.userinfo(accessToken);

  res.send(JSON.stringify(data));
};

const isAuth = () => {};

const isUser = () => {};

export { generateUrl, isAuth, isUser, login };
