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
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return; // If already connected, don't connect again
    }

    // Establish connection
    await mongoose.connect(MONGODB_URI, clientOptions);

    // Wait until connection is fully established
    mongoose.connection.once('open', async () => {
      try {
        // Ping the database to confirm the connection is active
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Ping successful, connected to MongoDB");
      } catch (pingError) {
        console.error("Ping command failed:", pingError);
        throw new Error("Failed to ping MongoDB after connection");
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
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

async function getAllTransactions() {
  await connectToDatabase();
  return Transaction.find().sort({ date: -1 });
}

export { getAllTransactions, getUserByWalletAddress, getTransactionsByUserId };
