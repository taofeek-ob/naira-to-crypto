import mongoose from "mongoose";
import User from "./user";
import Transaction from "./transaction";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // If already connected, don't connect again
    }
    await mongoose.connect(MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

// Helper functions
async function getUserByEmail(email) {
  await connectToDatabase();
  return User.findOne({ email });
}

//Helper function to save a new transaction
async function saveTransaction(data) {
  await connectToDatabase();
  return Transaction.create(data);
}

export { getUserByEmail, saveTransaction, connectToDatabase };
