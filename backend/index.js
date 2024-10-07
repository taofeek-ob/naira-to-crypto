const express = require("express");
const nodemailer = require("nodemailer");
const { ethers, JsonRpcProvider } = require("ethers");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());
// Environment variables for Gnosis Safe and Ethereum provider
const safeAddress = process.env.SAFE_ADDRESS; // Your Gnosis Safe address
const providerUrl = process.env.PROVIDER_URL; // Your Ethereum provider (e.g., Infura or Alchemy)
const privateKey = process.env.PRIVATE_KEY; // Backend's private key to sign transactions
const usdtTokenAddress = process.env.USDT_TOKEN_ADDRESS; // USDT Token Contract Address

const provider = new JsonRpcProvider(providerUrl);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", async (req, res) => {
  res.send("Hello New Test!");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
