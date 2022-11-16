require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");
const { verifyJWT, createCustomer } = require("./fns/userauthfns");
const sdb_config = require("./surrealdb/sdb_config");

const sdb = sdb_config();
module.exports = { sdb };

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

sv.put("/jwt/google", async (req, res) => {
  try {
    const rawToken = req.body.rawToken;

    //returns boolean and userData
    const { verified, userData } = await verifyJWT(
      rawToken,
      "https://accounts.google.com/.well-known/openid-configuration"
    );
    verified
      ? res.status(200).json({ m: "success", userData: userData })
      : res.status(400).json({ m: "invalid token" });
  } catch (error) {
    console.log(error);
  }
});

sv.post("/user/create", async (req, res) => {
  try {
    const created = await createCustomer(req.body.userData);

    res
      .status(201)
      .json({ m: "hello /!", success: created !== null && created !== [] });
  } catch (error) {
    console.log(error);
  }
});
