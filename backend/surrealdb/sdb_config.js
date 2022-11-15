require("dotenv").config({ path: "../../.env" });
const Surreal = require("surrealdb.js").default;

const db = new Surreal("http://127.0.0.1:8000/rpc");

async function main() {
  try {
    // Signin as a namespace, database, or root user
    await db.signin({
      user: "root",
      pass: process.env.SDB_PASS,
    });

    // Select a specific namespace / database
    await db.use("kusa", "kusa");

    // Create a new person with a random id
    let created = await db.create("location", {
      email: "locationatmarszalkowska@gmail.com",
      phone: "495 929 292 11",
      address: {
        street: "marszalkowska 8 / 18",
        zip: "01-144",
        city: "warsaw",
        region: "masowieckie",
        country: "poland",
      },
    });
    console.log("created:");
    console.log(created);

    // Update a person record with a specific id
    // let updated = await db.change("location", {
    // marketing: false,
    // });
    // console.log("updated");
    // console.log(updated);

    // Select all people records
    // let people = await db.select("person");
    // console.log("people");
    // console.log(people);

    // Perform a custom advanced query
    //   let groups = await db.query(
    //     "SELECT marketing, count() FROM type::table($tb) GROUP BY marketing",
    //     {
    //       tb: "person",
    //     }
    //   );
    //   console.log("groups");
    //   console.log(groups);
  } catch (e) {
    console.error("ERROR", e);
  }
}
main();
