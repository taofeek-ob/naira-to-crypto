// models/transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amountNaira: {
    type: Number,
    required: true,
  },
  amountUSDT: {
    type: Number,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
