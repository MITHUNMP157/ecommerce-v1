const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

let dbInstance;
let client;

async function run() {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      throw new Error("MONGO_URL not found in environment variables.");
    }

    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    dbInstance = client.db("ecommerce-v1");
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

function getDB() {
  if (!dbInstance) {
    throw new Error("Database not initialized! Call run() first.");
  }
  return {
    eCommerce: dbInstance.collection("SmartBuyz"),
    eCommerceCart: dbInstance.collection("orderedItems"),
  };
}

module.exports = { run, getDB, client, ObjectId };
