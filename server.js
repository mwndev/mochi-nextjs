require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname: "localhost", port: 3000 });

const handle = app.getRequestHandler();

console.log(handle);

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
    console.log(req);
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

    const kid = JSON.parse(headerBuf.toString()).kid;

    console.log(data);
    console.log(headerBuf);

    if (kid !== data.kid) return res.status(400).json({ m: "failuer" });

    res.status(200).json({ m: "success" });
  } catch (error) {
    console.log(error);
  }
});
