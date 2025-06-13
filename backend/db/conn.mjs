import { MongoClient } from "mongodb";

//in case of error change localhost to 127.0.0.1; computer might assume its an ipv6 address
const client = new MongoClient("mongodb://localhost:27017");

let conn;
try {
  console.log("Connecting to Local MongoDB...");
  conn = await client.connect();
  console.log("Connected to Local MongoDB");
} catch (e) {
  console.error("Error connecting to Local MongoDB:", e);
  process.exit(1);
}

const db = conn.db("cylcingcca");

//Optional: Use event listeners to monitor the connection status

client.on("serverOpening", () => {
  console.log("MongoDB server connection opened");
});
client.on("serverClosed", () => {
  console.log("MongoDB server connection closed");
});
client.on("ServerDescriptionChanged", (event) => {
  console.log("MongoDB server description changed:", event);
});

export default db;
