import DashboardComponent from "@/components/dashboard";
import { getUserByWalletAddress, getTransactionsByUserId } from "@/lib/mongodb";
import { redirect } from "next/navigation";

// Function to validate an Ethereum wallet address
const isValidEthereumAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export default async function Page({ params }) {
  // Verify that params.address is a valid Ethereum address
  if (!params?.address || !isValidEthereumAddress(params.address)) {
    redirect("/"); // Redirect to homepage if the address is invalid
    // Ensure the function exits after redirecting
  }

  const user = await getUserByWalletAddress(params.address);

  // Check if the user exists
  if (!user) {
    redirect("/signup");
    // Ensure that the function exits after redirecting
  }

  // Fetch transactions for the user
  const transactions = await getTransactionsByUserId(user._id);

  // Render the dashboard component with user and transactions data
  return <DashboardComponent user={JSON.parse(JSON.stringify(user))} transactions={JSON.parse(JSON.stringify(transactions))} />;
}
