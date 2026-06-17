const { DataAPIClient } = require("@datastax/astra-db-ts");
// Initialize the client
const client = new DataAPIClient();
const db = client.db('https://5b84d57a-52f9-491e-a861-9e32cbbad82b-us-east-2.apps.astra.datastax.com', { token: "AstraCS:yamofangeWtgCDfyuoSzivfA:853ce28de437e0985a642deab84a83c78f56e4e0522396866016fd603c9400fc"});

module.exports = db;
