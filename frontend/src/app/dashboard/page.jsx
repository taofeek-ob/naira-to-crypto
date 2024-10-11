import { redirect } from "next/navigation";

export default async function Page() {
  // Redirect to login if accessed without a wallet address
  redirect("/login");
}
