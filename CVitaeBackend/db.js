const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const connect_to_db = async () => {
    const uri = process.env.DB_URL; // Use your MongoDB URI from .env
    const dbName = "examples"; // Your database name

    // Create a MongoClient with a MongoClientOptions object
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        // Connect the client to the server
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Return the database instance
        return client.db(dbName);
    } catch (e) {
        console.error("Failed to connect to MongoDB:", e);
        throw e; // Re-throw the error to handle it in the calling code
    }
};

module.exports = connect_to_db;