require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname: "localhost", port: 3000 });

const handle = app.getRequestHandler();

console.log(handle);

const run = async () => {
  const sv = express();
  const port = process.env.PORT;

  sv.use(express.json());
  sv.use(cors());

  sv.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  process.stdin.on("data", (data) => {
    console.log(data.toString());
    //do some sort of server report here
  });

  sv.get("/", async (req, res) => {
    try {
      console.log(req);
      res.status(201).json({ m: "hello /!" });
    } catch (error) {
      console.log(error);
    }
  });
};
run();
