"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import User from "@/models/user";
import { getUserByWalletAddress } from "../lib/mongodb";
import { createVirtualAccount } from "@/lib/flutterwave";

export async function registerUser(formData) {
  const walletAddress = formData.get("walletAddress");
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const bvn = formData.get("bvn");

  try {
    const account = await createVirtualAccount({ email, bvn, fullName });
    const bankAccount = {
      accountNumber: account.data.account_number,
      accountName: fullName,
      bankName: account.data.bank_name,
      order_ref: account.data.order_ref,
    };
    const user = new User({ walletAddress, fullName, email, bvn, bankAccount });

    await user.save();
    revalidatePath("/dashboard/[address]");
    redirect(`/dashboard/${walletAddress}`);
  } catch (error) {
    console.error("Failed to register user:", error);
    return { success: false, message: "Failed to register user" };
  }
}

export async function checkUserExists(address) {
  try {
    let user = await getUserByWalletAddress(address);

    return { exists: !!user, error: null };
  } catch (error) {
    console.error("Failed to check user:", error);
    return { exists: false, error: "Failed to check user status" };
  }
}

//Create User on flutterwave

// const createVirtualAccount = async () => {
//   const details = {
//     email: "thebookwheezzhard@gmail.com",
//     is_permanent: "false",
//     amount: 100,
//   };

//   try {
//     const response = await flw.VirtualAcct.create(details);
//     console.log("Virtual Account Created: ", response);
//   } catch (error) {
//     console.error("Error creating virtual account: ", error);
//   }
// };

// // Function to fetch an existing virtual account by order reference
// const fetchVirtualAccount = async () => {
//   try {
//     const payload = {
//       order_ref: "URF_1727180279276_2199635", // Use the actual order reference from your virtual account creation
//     };
//     const response = await flw.VirtualAcct.fetch(payload);
//     console.log("Fetched Virtual Account: ", response);
//   } catch (error) {
//     console.error("Error fetching virtual account: ", error);
//   }
// };
