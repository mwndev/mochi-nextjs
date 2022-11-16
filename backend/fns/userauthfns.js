const getPem = require("rsa-pem-from-mod-exp");
const crypto = require("crypto");
const base64url = require("base64url");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuidv4");
const { redisClient } = require("../redis/redis_config");
const { sdb } = require("../surrealdb/sdb_config");

const createCustomer = async (userData) => {
  let data = userData;

  if (userData.pass.length < 1) return false;

  console.log(data);

  const salt = await bcrypt.genSalt();

  const hashed = await bcrypt.hash(data.pass, salt);

  delete data.pass;

  data = { ...data, hashedPass: hashed };

  console.log(data);

  console.log(sdb);

  const created = await sdb.create("customer", data);
  return created;
};

//returns false, null, or account data
const loginCustomer = async (authData, keepLoggedIn) => {
  try {
    const account = await sdb.query(
      `SELECT * FROM customer WHERE email = ${authData}`
    );
    if (account === [] || account === null) return null;

    const validPass = await bcrypt.compare(authData.pass, account.hashedpass);
    if (!validPass) return false;

    const sessionID = uuidv4();

    await redisClient.setEx(sessionID, 3600, account.email);

    if (!keepLoggedIn)
      return {
        userData: account.data,
        email: account.email,
        sessionID,
      };

    const stayLoggedInID = uuidv4();

    await redisClient.setEx(stayLoggedInID, 3600 * 24 * 7, account.email);

    return {
      userData: account.data,
      email: account.email,
      sessionID,
      stayLoggedInID,
    };
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async (authData) => {
  const account = await sdb.query(
    `SELECT * FROM customer WHERE email = ${authData}`
  );
  if (account === [] || account === null) return null;

  const validPass = await bcrypt.compare(authData.pass, account.pass);
  if (!validPass) return false;

  sdb.delete("customer:" + account.id);
};

const verifyJWT = async (token, keysURL) => {
  //TODO cache route
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

module.exports = { verifyJWT, createCustomer, loginCustomer, deleteCustomer };
