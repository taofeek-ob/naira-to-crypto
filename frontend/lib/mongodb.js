import mongoose from "mongoose";
import User from "@/models/user";
import Transaction from "@/models/transaction";

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
async function getUserByWalletAddress(walletAddress) {
  await connectToDatabase();
  return User.findOne({ walletAddress });
}

async function getTransactionsByUserId(userId) {
  await connectToDatabase();
  return Transaction.find({ userId });
}

export { connectToDatabase, getUserByWalletAddress, getTransactionsByUserId };
