require("dotenv").config();

const db = require("./config/astra");

async function test() {
  console.log(db)
  const collections = await db.listCollections();

  console.log(collections);
}

test();