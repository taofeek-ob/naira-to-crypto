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
const signer = new ethers.Wallet(privateKey, provider);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function getUSDTConversion(nairaAmount) {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ngn";
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-cg-demo-api-key": process.env.COINGECK0_API_KEY },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();

    // Extract the value of NGN from the response
    const usdtRate = json.tether.ngn; //  Get the conversion rate dynamically
    console.log(`Current USDT to NGN rate: ${usdtRate}`);

    // Convert the Naira amount to USDT using the fetched rate
    return (nairaAmount * 1000) / usdtRate;
  } catch (err) {
    console.error("error:" + err);
    throw new Error("Failed to fetch USDT conversion rate.");
  }
}

async function executeTransfer(to, amountUSDT) {
  // // Initialize Gnosis Safe

  const safeSdk = await Safe.init({
    provider: providerUrl, // Use the provider
    signer: privateKey, // Signer’s private key or address
    safeAddress: safeAddress, // Your Gnosis Safe address
  });

  // Define USDT contract and ABI (only the transfer function is needed)
  const usdtAbi = ["function transfer(address to, uint256 amount) public returns (bool)"];
  const usdtContract = new ethers.Contract(usdtTokenAddress, usdtAbi, signer);

  // Encode the transfer transaction
  const transferData = usdtContract.interface.encodeFunctionData("transfer", [to, ethers.parseUnits(amountUSDT.toFixed(1), 6)]);
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

  // Return the transaction hash, amountNaira, amountUSDT, and walletAddress
  return {
    transactionHash: executeTxResponse.hash,
    amountNaira: amountUSDT * 760, // Assuming 1 USDT = 760 Naira
    amountUSDT,
    walletAddress: to,
  };
}
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
