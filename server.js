require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");
const getPem = require("rsa-pem-from-mod-exp");
const crypto = require("crypto");
const base64url = require("base64url");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname: "localhost", port: 3000 });

const sv = express();
const port = process.env.PORT;

sv.use(express.json());
sv.use(cors());

sv.listen(port, () => {
  console.log(`listening on port ${port}`);
});
process.stdin.on("data", (data) => {
  console.log("this server doesn't accept shell commands");
  //maybe do something cool here
});

sv.get("/", async (req, res) => {
  try {
    res.status(201).json({ m: "hello /!" });
  } catch (error) {
    console.log(error);
  }
});

sv.put("/jwt", async (req, res) => {
  try {
    const token = req.body.rawToken;

    const OAuthRoute = await (
      await fetch(
        "https://accounts.google.com/.well-known/openid-configuration"
      )
    ).json();

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
    else return res.status(400).json({ m: "token not authentic" });

    const pem = getPem(key.n, key.e);

    console.log(pem);

    const verifier = crypto.createVerify("RSA-SHA256");

    verifier.update(content);

    console.log(verifier);
    console.log(signature);

    const verified = verifier.verify(pem, signature, "base64");

    console.log(verified);

    verified
      ? res.status(200).json({ m: "success" })
      : res.status(400).json({ m: "invalid token" });
  } catch (error) {
    console.log(error);
  }
});
