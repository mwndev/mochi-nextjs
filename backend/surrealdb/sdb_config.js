require("dotenv").config({ path: "../../.env" });
const Surreal = require("surrealdb.js").default;

const db = new Surreal("http://127.0.0.1:8000/rpc");

async function sdb_config() {
  try {
    // Signin as a namespace, database, or root user
    await db.signin({
      user: "root",
      pass: process.env.SDB_PASS,
    });

    // Select a specific namespace / database
    await db.use(process.env.SDB_NS, process.env.SDB_DB);

    return db;
  } catch (e) {
    console.error("ERROR", e);
  }
}
module.exports = sdb_config;
