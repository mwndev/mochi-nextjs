const getPem = require("rsa-pem-from-mod-exp");
const crypto = require("crypto");
const base64url = require("base64url");
const jwt_decode = require("jwt-decode");

const verifyJWT = async (token, keysURL) => {
  //TODO check redis db for keys matching url and skip this part if returns keyset
  const OAuthRoute = await (await fetch(keysURL)).json();

  const data = await (await fetch(OAuthRoute.jwks_uri)).json();

  const parts = token.split(".");

  const headerBuf = Buffer.from(parts[0], "base64");
  const bodyBuf = Buffer.from(parts[1], "base64");
  const content = parts[0] + "." + parts[1];
  const signature = base64url.toBase64(parts[2]);

  const kid = JSON.parse(headerBuf.toString()).kid;

  let key;

  if (kid === data.keys[0].kid) key = data.keys[0];
  else if (kid === data.keys[1].kid) key = data.keys[1];
  else return false;

  const pem = getPem(key.n, key.e);

  const verifier = crypto.createVerify("RSA-SHA256");

  verifier.update(content);

  const verified = verifier.verify(pem, signature, "base64");

  const userData = JSON.parse(bodyBuf.toString());

  if (userData.iss !== "https://accounts.google.com") return false;

  return { verified, userData };
};

module.exports = { verifyJWT };
