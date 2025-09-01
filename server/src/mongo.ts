import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URL || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let connected = false;
let db: any;

export async function run() {
  try {
    if (!db) {
    await client.connect(); // connect only once
    db = client.db("chatapp"); // replace with your db name
    console.log("✅ MongoDB connected");
  }
  return db;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
