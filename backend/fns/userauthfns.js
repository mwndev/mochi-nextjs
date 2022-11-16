const getPem = require("rsa-pem-from-mod-exp");
const crypto = require("crypto");
const base64url = require("base64url");
const { sdb } = require("../server");
const bcrypt = require("bcrypt");

const createCustomer = async (userData) => {
  let data = userData;

  console.log(data);

  const salt = bcrypt.genSalt();

  const hashed = bcrypt.hash(data.pass, salt);

  delete data.pass;

  data = { ...data, hashedPass: hashed };

  console.log(data);

  const created = await sdb.create("customer", data);
  return created;
};

//returns false, null, or account data
const loginCustomer = async (authData) => {
  const account = await sdb.query(
    `SELECT * FROM customer WHERE email = ${authData}`
  );
  if (account === [] || account === null) return null;

  const validPass = await bcrypt.compare(authData.pass, account.pass);
  if (!validPass) return false;

  return account.data;
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
