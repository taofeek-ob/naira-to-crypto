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
//Helper function to save a new transaction
async function getAllTransactions() {
  await connectToDatabase();
  
  return Transaction.find().sort({ date: -1 }).limit(100);
}


// Helper function to start watching the transactions collection
async function startTransactionWatcher(io, server, port) {
  await connectToDatabase();

  const collection = mongoose.connection.db.collection("transactions");
  const changeStream = collection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newTransaction = change.fullDocument;
      io.emit("newTransaction", newTransaction);
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export { getUserByEmail, saveTransaction, startTransactionWatcher, getAllTransactions };
