/**
 * @file index.js
 * @description Express server for handling crypto exchanges and email notifications
 */

// Import required libraries
const express = require("express"); // For creating the Express app
const nodemailer = require("nodemailer"); // For sending emails
const { ethers, JsonRpcProvider } = require("ethers"); // For interacting with Ethereum blockchain
import {  getUserByEmail, saveTransaction, getAllTransactions } from "./lib/mongodb"; // MongoDB functions for user and transaction handling
const Safe = require("@safe-global/protocol-kit").default; // Gnosis Safe SDK
const Ably = require('ably');


// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Define the port for the server

// Environment variables for Gnosis Safe and Ethereum provider
const safeAddress = process.env.SAFE_ADDRESS; // Your Gnosis Safe address
const providerUrl = process.env.PROVIDER_URL; // Your Ethereum provider (e.g., Infura or Alchemy)
const privateKey = process.env.PRIVATE_KEY; // Backend's private key to sign transactions
const usdtTokenAddress = process.env.USDT_TOKEN_ADDRESS; // USDT Token Contract Address

// Initialize Ethereum provider and signer
const provider = new JsonRpcProvider(providerUrl);
const signer = new ethers.Wallet(privateKey, provider);


const ably = new Ably.Realtime(process.env.ABLY_API_KEY);

const channel = ably.channels.get('transactions-channel');

// Middleware to parse JSON request bodies
app.use(express.json());



// Create a transporter using Mailtrap SMTP for email notifications
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "a62ca2c34d4365f28f6c7aff7b1af56d", // Mailtrap credentials
  },
});

/**
 * Sends an email notification to the user upon successful transfer.
 *
 * @param {string} userEmail - The recipient's email address.
 * @param {string} transactionHash - The hash of the completed transaction.
 * @param {number} amountNaira - The amount transferred in Naira.
 * @param {number} amountUSDT - The amount transferred in USDT.
 * @param {string} to - The recipient's wallet address.
 */
async function sendEmail(userEmail, transactionHash, amountNaira, amountUSDT, to) {
  const mailOptions = {
    from: "NairaToCrypto <hello@demomailtrap.com>", // Sender address
    to: userEmail, // Recipient email
    subject: "Exchange Successful", // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1 style="color: #4CAF50; font-size: 24px;">Transfer Successful 🎉</h1>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Your transfer has been completed successfully! Below are the details:
        </p>
        <h2 style="color: #4CAF50; font-size: 20px;">Transaction Details:</h2>
        <ul style="font-size: 16px; background: #f9f9f9; padding: 15px; border-radius: 8px; list-style-type: none;">
          <li style="margin-bottom: 10px;"><strong>Recipient:</strong> ${to}</li>
          <li style="margin-bottom: 10px;"><strong>Naira Transferred:</strong> ${amountNaira} NGN</li>
          <li style="margin-bottom: 10px;"><strong>Amount Transferred:</strong> ${amountUSDT} USDT</li>
          <li style="margin-bottom: 10px;">
            <strong>Transaction Hash:</strong>
            <a href="https://sepolia.basescan.org/tx/${transactionHash}" style="color: #4CAF50; text-decoration: none;">
              View on Explorer
            </a>
          </li>
        </ul>
        <p style="font-size: 16px; margin-top: 20px;">Thank you for using our service! 🙌</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions); // Send email
    console.log("Test email sent successfully via Mailtrap!");
  } catch (error) {
    console.error("Error sending email:", error.message); // Log any error that occurs while sending email
  }
}

// Simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Hello World!"); // Respond with a greeting
});

/**
 * Webhook endpoint to receive payloads from payment gateways like Paystack.
 * Processes the payment and initiates the crypto transfer.
 */
app.post("/webhook", async (req, res) => {
  try {
    console.log("Received webhook:", req.body); // Log the webhook data

    // Extract necessary data from the webhook payload
    const {
      amount,
      customer: { email },
    } = req.body.data;

    const amountNaira = amount*100; // Amount in Naira

    // Retrieve user information from MongoDB using email
    const { _id, walletAddress } = await getUserByEmail(email);

    // Calculate the amount of USDT to send
    const amountUSDT = (await getUSDTConversion(amountNaira)).toFixed(1);

    // Execute the transfer via Gnosis Safe
    const { transactionHash } = await executeTransfer(walletAddress, amountUSDT);

    // Save transaction in MongoDB
    const data = {
      userId: _id,
      amountNaira,
      amountUSDT,
      walletAddress,
      transactionHash,
    };
    await saveTransaction(data); // Save transaction data
    
    channel.publish('newTransaction', {...data, date: Date.now()});
 
    // Send email notification to the user
    sendEmail("taofeek01@yahoo.com", transactionHash, amountNaira, amountUSDT, walletAddress);

    // Respond with success
    res.status(200).send({
      message: "Transaction Successful",
      transactionHash,
    });
  } catch (error) {
    console.error("Error processing webhook:", error); // Log any error that occurs
    res.status(500).send("Error processing webhook"); // Respond with an error message
  }
});


/**
 * Fetches the current USDT conversion rate from CoinGecko and converts Naira amount to USDT.
 *
 * @param {number} nairaAmount - Amount in Naira to be converted.
 * @returns {Promise<number>} - The equivalent amount in USDT.
 */
async function getUSDTConversion(nairaAmount) {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ngn";
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-cg-demo-api-key": process.env.COINGECKO_API_KEY },
  };

  try {
    const res = await fetch(url, options); // Fetch conversion rate from CoinGecko
    const json = await res.json();

    const usdtRate = json.tether.ngn; // Get the conversion rate dynamically
    console.log(`Current USDT to NGN rate: ${usdtRate}`);

    // Convert the Naira amount to USDT using the fetched rate
    return (nairaAmount) / usdtRate; // Assume 1000 for conversion ratio as per business logic
  } catch (err) {
    console.error("error:" + err); // Log any error that occurs
    throw new Error("Failed to fetch USDT conversion rate."); // Throw error if fetching fails
  }
}

/**
 * Executes the transfer of USDT to the specified wallet address using Gnosis Safe.
 *
 * @param {string} to - The recipient's wallet address.
 * @param {number} amountUSDT - The amount of USDT to be transferred.
 * @returns {Promise<Object>} - Contains the transaction hash and transferred amount.
 */
async function executeTransfer(to, amountUSDT) {
  // Initialize Gnosis Safe
  const safeSdk = await Safe.init({
    provider: providerUrl, // Use the provider
    signer: privateKey, // Signer’s private key or address
    safeAddress: safeAddress, // Your Gnosis Safe address
  });

  // Define USDT contract and ABI (only the transfer function is needed)
  const usdtAbi = ["function transfer(address to, uint256 amount) public returns (bool)"];
  const usdtContract = new ethers.Contract(usdtTokenAddress, usdtAbi, signer);

  // Encode the transfer transaction
  const transferData = usdtContract.interface.encodeFunctionData("transfer", [to, ethers.parseUnits(amountUSDT, 6)]);
  const safeTransactionData = {
    to: usdtTokenAddress,
    value: "0",
    data: transferData,
  };

  // Create the Safe transaction
  const safeTransaction = await safeSdk.createTransaction({ transactions: [safeTransactionData] });

  // Sign the transaction
  const signedSafeTransaction = await safeSdk.signTransaction(safeTransaction);

  // Execute the transaction
  const executeTxResponse = await safeSdk.executeTransaction(signedSafeTransaction);

  // Wait for the transaction to be mined
  await executeTxResponse.transactionResponse?.wait();

  // Return the transaction hash and amount transferred
  return {
    transactionHash: executeTxResponse.hash,
  };
}



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });